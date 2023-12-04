import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cadastrarUsuario } from '../redux/user-reducer';
import STATE from '../resources/state';

export const User = () => {

    const [errors, setErrors] = useState({});
    const [nickname, setNickname] = useState("");
    const [urlAvatar, seturlAvatar] = useState("");
    const [exibirSpinner, setExibirSpinner] = useState(false);

    const userState = useSelector((state) => state.user);

    useEffect(() => {
        setExibirSpinner(false);
        if (userState.state === STATE.OCIOSO && userState.mensagem !== "") {
            setNickname("");
            seturlAvatar("");
            alert(userState.mensagem);
        }
        if(userState.state === STATE.ERRO){
            alert(userState.mensagem);
        }
        if(userState.state === STATE.PENDENTE){
            setExibirSpinner(true)
        }
    }, [userState.state]);

    const dispatch = useDispatch();

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleurlAvatarChange = (e) => {
        seturlAvatar(e.target.value);
    };

    const onValidated = () => {
        dispatch(cadastrarUsuario({ nickname, urlAvatar }));
        console.log("Usuário cadastrado com sucesso!")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errorsObject = {}

        if (nickname === "") {
            errorsObject.nickname = 'Nickname é obrigatório';
        }
        if (urlAvatar === "") {
            errorsObject.urlAvatar = 'Url do avatar é obrigatório';
        }
        if (!errorsObject.nickname && !errorsObject.urlAvatar) {
            return onValidated();
        }
        setErrors(errorsObject);
    };

    return (
        <Container>
            <h2>Cadastro de Usuário</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nickname">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o seu nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    {errors.nickname && <span style={{ color: 'red' }}>{errors.nickname}</span>}
                </Form.Group>

                <Form.Group controlId="urlAvatar">
                    <Form.Label>URL do Avatar</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite a URL do avatar"
                        value={urlAvatar}
                        onChange={handleurlAvatarChange}
                    />
                    {errors.urlAvatar && <span style={{ color: 'red' }}>{errors.urlAvatar}</span>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
            {exibirSpinner && <Spinner animation="border" role="status"></Spinner>}
        </Container>
    );
}