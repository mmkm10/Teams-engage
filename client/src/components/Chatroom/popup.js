import React, { useState } from 'react';
import { v1 as uuid } from 'uuid';
import { IonModal, IonButton, IonContent } from '@ionic/react';
import Room from '../VideoChat/Room';
import { Redirect, useHistory } from 'react-router';

const ModalExample =() => {
  const id=uuid();
  const [showModal, setShowModal] = useState(false);
  const history=useHistory();
  return (
    <IonContent>
      <IonModal isOpen={showModal} >
        <Redirect to="/room/${id}" />
        <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
      </IonModal>
      <IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton>
    </IonContent>
  );
};
export default ModalExample;