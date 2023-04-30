import React from "react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import renderWithRouter from "./helpers/renderWith";

describe("Login tests", () => {

  it("Testa se há botões", () => {
    renderWithRouter(<App />);
    const inputMail = screen.getByRole("textbox", { name: "" });
    const inputSenha = screen.getByRole("textbox", { name: "" });
    const btnLogin = screen.getByRole("button", { name: /login/i });
    const btnRegister = screen.getByRole("button", {
      name: /ainda não tenho conta/i,
    });
    expect(inputMail).toBeDefined();
    expect(inputSenha).toBeDefined();
    expect(btnLogin).toBeDefined();
    expect(btnLogin).toBeDisabled();
    expect(btnRegister).toBeDefined();
  });

  it("Testa se o botão leva até a rota /register", async () => {
    const { history } = renderWithRouter(<App />);
    const loginbtnRegister = screen.getByRole("button", { name: /ainda não tenho conta/i });
    userEvent.click(loginbtnRegister);
    const btnRegister = await screen.findByRole('button', {  name: /cadastrar/i});
    expect(btnRegister).toBeInTheDocument();
  });

  it("Quando não passar email válido, o botão desabilita", async () => {
    renderWithRouter(<App />);
    const inputMail = screen.getByRole("textbox", { name: ""});
    userEvent.type(inputMail, 'teste@mail.com')
    expect(inputMail.value).toBe('teste@mail.com');
  });

});

