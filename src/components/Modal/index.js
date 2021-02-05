import "./styles";
import { Overlay, ModalContainer } from "./styles";


function Modal({ title, children }) {
    return (
        <Overlay>
            <ModalContainer>
                <spam>&times;</spam>
                <header>{title}</header>
                {children}
            </ModalContainer>
        </Overlay>
    );
}


export default Modal;