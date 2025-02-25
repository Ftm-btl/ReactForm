import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";

interface ModalProps {
    visible: boolean;
    onHide: () => void;
    onSelect: (item: any) => void;
}

const Modal: React.FC<ModalProps> = ({visible, onHide, onSelect}) => {
    const [searchTerm] = useState<string>("");
    const [items, setItems] = useState<{ id: number; name: string; email: string; body: string }[]>([]);

    useEffect(() => {
        if (visible) {
          fetch("https://jsonplaceholder.typicode.com/comments")
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Veri getirme hatası:", error));
        }
      }, [visible]);

    const filtratedItems = items.filter((item) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
);

    return (
        <Dialog
            header="Bir ID veya isim seçiniz"
            visible={visible}
            style={{ width: "400px" }}
            onHide={onHide}
        >

        <ListBox
            options={filtratedItems}
            optionLabel="name"
            itemTemplate={(item) => (
                <div>
                    <strong>{item.name}</strong> <br />
                    <small>{item.email}</small>
                </div>
            )}
            onChange={(e) => onSelect(e.value)}
            filter
            placeholder="ID veya isim seçiniz"
            className="w-full"
        />

        <Button label="Kapat" onClick={onHide} className="p-button-text" />
        </Dialog>
    );
};

export default Modal;