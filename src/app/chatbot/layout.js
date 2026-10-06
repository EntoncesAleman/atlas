import { publicMetadata } from '../lib/site';

export const metadata = publicMetadata('/chatbot', 'Buscador del Atlas — Atlas del Cultivo Argentino', 'Buscá temas y entradas del Atlas del Cultivo Argentino sin crear una cuenta.');

export default function ChatbotLayout({ children }) {
  return children;
}
