import { GlobalStyle } from './styles/GlobalStyles';
import Button from './components/Button';
import InputField from './components/InputField';
import PasswordInput from './components/PasswordField';
import InputWithAvatar from './components/InputWithAvatar';
import AvatarTeste from './assets/perfil.jpg'
import ColorInput from './components/ColorInput';
import DateInput from './components/DateInput';
import DropdownSearch from './components/DropdownSearch';
import SelectInput from './components/SelectInput';
import Switch from './components/Switch';
import Sidebar from './components/Sidebar';

const opcoesDropDown = ["Opção 1", "Opção 2", "Opção 3", "Opção 4"];

const opcoesSelect = [
  { value: 'opcao1', label: 'Opção 1' },
  { value: 'opcao2', label: 'Opção 2' },
  { value: 'opcao3', label: 'Opção 3' },
  { value: 'opcao4', label: 'Opção 4' },
];

const modalidades = ["Por equipes", "Individuais"];

function App() {
  const handleModalidadeChange = (selected) => {
    console.log("Modalidade alterada para:", selected);
  };
  const avatarurl = './src/assets/perfil.jpg';
  const currentPath = '/eventos';
  const logoUrl = "./src/assets/logo.png";

  const currentUser = {
    name: "Adriano França",
    role: "Administrador",
    avatarUrl: avatarurl
  };

  return (
    <>
      <GlobalStyle />
      <Sidebar logoUrl={logoUrl} currentUser={currentUser} currentPath={currentPath}/>
      <InputField label="Nome completo" placeholder="Digite aqui seu nome" />
      <PasswordInput label="Senha"/>
      <InputWithAvatar label="Selecione seu avatar" avatarSrc={AvatarTeste} fileUploadId="chat-message"/>
      <ColorInput label="Escolha uma cor"/>
      <DateInput label="Data de nascimento"/>
      <DropdownSearch label="Escolha uma das opções" options={opcoesDropDown} placeholder="Selecione..."/>
      <SelectInput label="Selecione uma opção" options={opcoesSelect} placeholder="Selecione..."/>
      <Switch
        label="Modalidades"
        options={modalidades}
        onToggle={handleModalidadeChange}
      />
      <Button>Enviar</Button>
      
    </>
  );
}

export default App;