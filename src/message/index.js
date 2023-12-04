import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Image, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { buscarUsuario } from '../redux/user-reducer';
import { DeletarMensagem, buscarMensagens, enviarMensagem } from '../redux/message-reducer';

export const Message = () => {
    const usuarios = useSelector((state) => state.user.lista);
    const mensagensRecebidas = useSelector((state) => state.message.lista);
    const mensagemState = useSelector((state) => state.message);
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarUsuario());
        dispatch(buscarMensagens());
    }, [dispatch])

    useEffect(() => {
        setShowAlert(true)
    }, [mensagemState.mensagem, dispatch])

    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
    const [mensagem, setMensagem] = useState('');

    function canBeEdited(timestampString) {
        const [datePart, timePart] = timestampString.split(', ');
        const [day, month, year] = datePart.split('/');
        const reorganizedTimestampString = `${month}/${day}/${year}, ${timePart}`;
        const timestamp = new Date(reorganizedTimestampString);
        timestamp.setHours(timestamp.getHours() - 3);
        const now = new Date();
        const difference = now.getTime() - timestamp.getTime();
        const differenceInMinutes = difference / (1000 * 60);
        return differenceInMinutes < 5;
    }

    // const handleView = async (id) => {
    //     await dispatch(editarMensagem({
    //         lido: true,
    //         id: id
    //     }))
    // }

    const handleUsuarioChange = (e) => {
        setUsuarioSelecionado(e.target.value);
    };

    const handleMensagemChange = (e) => {
        setMensagem(e.target.value);
    };

    const handleExcluir = async (id) => {
        dispatch(DeletarMensagem({
            id: id
        }))
        dispatch(buscarMensagens());
    }

    const handleEnviarMensagem = async (e) => {
        e.preventDefault();

        const novaMensagem = {
            mensagem: mensagem,
            usuario: {
                id: usuarioSelecionado
            }
        }
        await dispatch(enviarMensagem(novaMensagem));

        dispatch(buscarMensagens());
        setMensagem('');
    };

    return (
        <Container>
            <h2>Enviar Mensagem</h2>
            <Alert variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible>{mensagemState.mensagem}</Alert>
            <Form onSubmit={handleEnviarMensagem}>
                <Form.Group controlId="usuario">
                    <Form.Label>Selecione o Usuário</Form.Label>
                    <Form.Control as="select" value={usuarioSelecionado} onChange={handleUsuarioChange}>
                        <option value="">Selecione um usuário</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nickname}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="mensagem">
                    <Form.Label>Digite a Mensagem</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite sua mensagem"
                        value={mensagem}
                        onChange={handleMensagemChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>

            <div className="mt-4">
                <h2>Mensagens Recebidas</h2>
                {mensagensRecebidas.length === 0 ? (
                    <p>Nenhuma mensagem recebida.</p>
                ) : (
                    <Card>
                        <Card.Body>
                            {mensagensRecebidas.map((mensagem, index) => {
                                if (mensagem.lida === false) {
                                    //handleView(mensagem.id);
                                }
                                return (
                                    <Row key={index} className="mb-2">
                                        <Col md="auto">
                                            <Image src={mensagem.usuario.urlAvatar}
                                                roundedCircle style={{ width: '30px', height: '30px' }} />
                                        </Col>
                                        <Col>
                                            <strong>{mensagem.usuario.nickname}:</strong> {mensagem.mensagem}
                                        </Col>
                                        {canBeEdited(mensagem.dataHora) &&
                                            <Col md="auto">
                                                <Button variant="danger" size="sm"
                                                    onClick={() => {
                                                        handleExcluir(mensagem.id)
                                                    }}>
                                                    Excluir
                                                </Button>
                                            </Col>}
                                    </Row>

                                )
                            })}
                        </Card.Body>
                    </Card>
                )}
            </div>
        </Container>
    );
};
