import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATE from "../resources/state.js";
import { baseUrl } from "../util/base-url.js";

export const cadastrarUsuario = createAsyncThunk("user/post", async (user) => {
    try {
        const response = await fetch(baseUrl + "/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await response.json();
        if (data.status) {
            return {
                status: true,
                id: data.id,
                mensagem: data.mensagem
            }
        }
        else {
            return {
                status: false,
                mensagem: "Erro ao cadastrar usuário!"
            }
        }
    } catch (error) {
        return {
            status: false,
            mensagem: "Erro ao cadastrar usuário!"
        }
    }
})

export const buscarUsuario = createAsyncThunk("user/get", async () => {
    try {
        const response = await fetch(baseUrl + "/usuario", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        if (data.status) {
            return {
                status: true,
                lista: data.listaUsuarios,
            }
        }
        else {
            return {
                status: false,
                mensagem: "Erro ao buscar usuário!"
            }
        }
    } catch (error) {
        return {
            status: false,
            mensagem: "Erro ao buscar usuário!"
        }
    }
}
)

const initialState = {
    lista: [],
    mensagem: "",
    state: STATE.OCIOSO,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarUsuario.pending, (state, action) => {
            state.state = STATE.PENDENTE;
            state.mensagem = "Buscando usuários...";
        })
        builder.addCase(buscarUsuario.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.state = STATE.OCIOSO;
                state.lista = action.payload.lista;
                state.mensagem = "Usuários buscados com sucesso!";
            }
            else {
                state.state = STATE.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        builder.addCase(buscarUsuario.rejected, (state, action) => {
            state.state = STATE.ERRO;
            state.mensagem = "Erro ao buscar usuários!";
        })
        builder.addCase(cadastrarUsuario.pending, (state, action) => {
            state.state = STATE.PENDENTE;
            state.mensagem = "Cadastrando usuário...";
        })
        builder.addCase(cadastrarUsuario.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.state = STATE.OCIOSO;
                state.mensagem = action.payload.mensagem;
            }
            else {
                state.state = STATE.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        builder.addCase(cadastrarUsuario.rejected, (state, action) => {
            state.state = STATE.ERRO;
            state.mensagem = "Erro ao cadastrar usuário!";
        })
    },
})

export default userSlice.reducer;