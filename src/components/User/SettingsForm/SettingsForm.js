import React from "react";
import { Button } from "semantic-ui-react";
import "./SettingsForm.scss";

export default function SettingsForm({ setShowModal }) {
  return (
    <div className="settings-form">
      <Button>Cambiar contraseña</Button>
      <Button>Cambiar email</Button>
      <Button>Descripcion</Button>
      <Button>Sitio web</Button>
      <Button>Cerrar sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
