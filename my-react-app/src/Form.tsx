import { useState } from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
import './index.css';
import Modal from "./modal";

const Form = () => {
    const [fromData, setFromData] = useState({
        postId: 1,
        id: 0,
        name: "",
        email: "",
        body: ""

    });  

    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (item:any)=>{
        setFromData({
            ...fromData,
            id: item.id,
            name:item.name,
            email:item.email,
            body:item.body
        });
        setModalVisible(false);
    };

    const handleIdEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          const id = fromData.id; 
      
          if (!id || id <= 0) {
            console.warn("Geçerli bir ID girin");
            return; // ID 0 veya geçersizse API çağrısı yapma
          }
      
          try {
            const response = await fetch(
              `https://jsonplaceholder.typicode.com/comments/${id}`
            );
      
            if (!response.ok) {
              throw new Error("Veri bulunamadı");
            }
      
            const data = await response.json();
            setFromData((prev) => ({
              ...prev,
              name: data.name,
              email: data.email,
              body: data.body,
            }));
          } catch (error) {
            console.error("Veri getirme hatası:", error);
          }
        }
      };

    return (
        <div className="form-container">
      <label htmlFor="id">ID:</label>
      <div className="p-inputgroup mb-2">
        <InputText
            id="id"
            name="id"
            value={fromData.id.toString()}
            onChange={(e) => setFromData({ ...fromData, id: Number(e.target.value) || 0 })}
            onKeyDown={handleIdEnter} 
        />
        <Button label="seç" className="p-button-sm p-button-secondary" onClick={() => setModalVisible(true)} />
      </div>

        <label htmlFor="name">Name:</label>
            <InputText 
                id="name" 
                name="name" 
                value={String(fromData.name)} 
                readOnly className="mb-2" 
        />

        <label htmlFor="email">Email:</label>
            <InputText 
                id="email" 
                name="email" 
                value={String(fromData.email)} 
                readOnly className="mb-2" 
            />

        <label htmlFor="body">Body:</label>
            <InputTextarea 
                id="body" 
                name="body" 
                value={String(fromData.body)} 
                readOnly rows={5} className="mb-2" 
            />

      <Button label="Gönder" className="p-button-primary" />

      {/* Modal Bileşeni */}
      <Modal visible={modalVisible} onHide={() => setModalVisible(false)} onSelect={handleChange} />
    </div>
    );
};
export default Form;