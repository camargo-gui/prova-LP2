import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { buscarUsuario } from '../redux/user-reducer';

export const Message = () => {
  const usuarios = useSelector((state) => state.user.lista);
  const mensagensRecebidas = useSelector((state) => state.message.lista);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buscarUsuario());
  }, [])

  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleUsuarioChange = (e) => {
    setUsuarioSelecionado(e.target.value);
  };

  const handleMensagemChange = (e) => {
    setMensagem(e.target.value);
  };

  const handleEnviarMensagem = (e) => {
    e.preventDefault();

    // Simulação de envio de mensagem
    const novaMensagem = {
      remetente: usuarioSelecionado,
      conteudo: mensagem,
    };

    setMensagensRecebidas([...mensagensRecebidas, novaMensagem]);

    setMensagem('');
  };

  return (
    <Container>
      <h2>Enviar Mensagem</h2>
      <Form onSubmit={handleEnviarMensagem}>
        <Form.Group controlId="usuario">
          <Form.Label>Selecione o Usuário</Form.Label>
          <Form.Control as="select" value={usuarioSelecionado} onChange={handleUsuarioChange}>
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.nickname}>
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
              {mensagensRecebidas.map((mensagem, index) => (
                <Card.Text key={index}>
                  <strong>{mensagem.remetente}:</strong> {mensagem.conteudo}
                </Card.Text>
              ))}
            </Card.Body>
          </Card>
        )}
      </div>
    </Container>
  );
};
