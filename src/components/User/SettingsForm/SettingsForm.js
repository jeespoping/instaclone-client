import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import "./SettingsForm.scss";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";

export default function SettingsForm({
  setShowModal,
  setChildrenModal,
  setTittleModal,
  getUser,
}) {
  const { logout } = useAuth();
  const client = useApolloClient();
  const history = useHistory();

  const onChangePassword = () => {
    setTittleModal("Cambiar tu contraseña");
    setChildrenModal(<PasswordForm onLogout={onLogout} />);
  };

  const onChageEmail = () => {
    setTittleModal("Cambiar tu email");
    setChildrenModal(
      <EmailForm currentEmail={getUser.email} setShowModal={setShowModal} />
    );
  };

  const onLogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Cambiar contraseña</Button>
      <Button onClick={onChageEmail}>Cambiar email</Button>
      <Button>Descripcion</Button>
      <Button>Sitio web</Button>
      <Button onClick={onLogout}>Cerrar sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
