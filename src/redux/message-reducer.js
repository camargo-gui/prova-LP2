import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATE from "../resources/state.js";
import { baseUrl } from "../util/base-url.js";

export const enviarMensagem = createAsyncThunk("message/post", async (message) => {
    try {
        const response = await fetch(baseUrl + "/mensagem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
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

export const buscarMensagens = createAsyncThunk("message/get", async () => {
    try {
        const response = await fetch(baseUrl + "/mensagem", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        if (data.status) {
            return {
                status: true,
                lista: data.listaMensagens,
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

export const editarMensagem = createAsyncThunk("message/put", async (message) => {
    try {
        const response = await fetch(baseUrl + "/mensagem", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
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
                mensagem: "Erro ao editar mensagem!"
            }
        }
    } catch (error) {
        return {
            status: false,
            mensagem: "Erro ao editar mensagem!"

        }
    }
}
)

export const DeletarMensagem = createAsyncThunk("message/delete", async (message) => {
    try {
        const response = await fetch(baseUrl + "/mensagem", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
        const data = await response.json();
        if (data.status) {
            return {
                status: true,
                mensagem: data.mensagem
            }
        }
        else {
            return {
                status: false,
                mensagem: "Erro ao deletar mensagem!"
            }
        }
    } catch (error) {
        return {
            status: false,
            mensagem: "Erro ao deletar mensagem!"

        }
    }

})
const initialState = {
    lista: [],
    mensagem: "",
    state: STATE.OCIOSO,
}

const messageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarMensagens.pending, (state, action) => {
            state.state = STATE.PENDENTE;
            state.mensagem = "Buscando mensagens...";
        })
        builder.addCase(buscarMensagens.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.state = STATE.OCIOSO;
                state.lista = action.payload.lista;
                state.mensagem = "Mensagens buscadas com sucesso!";
            }
            else {
                state.state = STATE.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        builder.addCase(buscarMensagens.rejected, (state, action) => {
            state.state = STATE.ERRO;
            state.mensagem = "Erro ao buscar mensagens!";
        })
        builder.addCase(enviarMensagem.pending, (state, action) => {
            state.state = STATE.PENDENTE;
            state.mensagem = "Enviando...";
        })
        builder.addCase(enviarMensagem.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.state = STATE.OCIOSO;
                state.mensagem = action.payload.mensagem;
            }
            else {
                state.state = STATE.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        builder.addCase(enviarMensagem.rejected, (state, action) => {
            state.state = STATE.ERRO;
            state.mensagem = "Erro ao enviar mensagem!";
        })
        builder.addCase(editarMensagem.pending, (state, action) => {
            state.state = STATE.PENDENTE;
            state.mensagem = "Editando...";
        })
        builder.addCase(editarMensagem.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.state = STATE.OCIOSO;
                state.mensagem = action.payload.mensagem;
            }
            else {
                state.state = STATE.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        builder.addCase(editarMensagem.rejected, (state, action) => {
            state.state = STATE.ERRO;
            state.mensagem = "Erro ao editar mensagem!";
        })
        builder.addCase(DeletarMensagem.pending, (state, action) => {
            state.state = STATE.PENDENTE;
            state.mensagem = "Deletando...";
        })
        builder.addCase(DeletarMensagem.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.state = STATE.OCIOSO;
                state.mensagem = action.payload.mensagem;
            }
            else {
                state.state = STATE.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        builder.addCase(DeletarMensagem.rejected, (state, action) => {
            state.state = STATE.ERRO;
            state.mensagem = "Erro ao deletar mensagem!";
        })
    },
})

export default messageSlice.reducer;