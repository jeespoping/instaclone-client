import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import "./SettingsForm.scss";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";

export default function SettingsForm({
  setShowModal,
  setChildrenModal,
  setTittleModal,
  getUser,
  refetch,
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
      <EmailForm
        refetch={refetch}
        currentEmail={getUser.email}
        setShowModal={setShowModal}
      />
    );
  };

  const onChangeDescription = () => {
    setTittleModal("Cambiar tu descripcion");
    setChildrenModal(
      <DescriptionForm
        refetch={refetch}
        currentDescription={getUser.description}
        setShowModal={setShowModal}
      />
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
      <Button onClick={onChangeDescription}>Descripcion</Button>
      <Button>Sitio web</Button>
      <Button onClick={onLogout}>Cerrar sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
