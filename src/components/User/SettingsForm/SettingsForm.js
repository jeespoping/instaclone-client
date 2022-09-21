import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import "./SettingsForm.scss";
import PasswordForm from "../PasswordForm";

export default function SettingsForm({
  setShowModal,
  setChildrenModal,
  setTittleModal,
}) {
  const { logout } = useAuth();
  const client = useApolloClient();
  const history = useHistory();

  const onChangePssword = () => {
    setTittleModal("Cambiar tu contraseña");
    setChildrenModal(<PasswordForm />);
  };

  const onLogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  return (
    <div className="settings-form">
      <Button onClick={onChangePssword}>Cambiar contraseña</Button>
      <Button>Cambiar email</Button>
      <Button>Descripcion</Button>
      <Button>Sitio web</Button>
      <Button onClick={onLogout}>Cerrar sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
