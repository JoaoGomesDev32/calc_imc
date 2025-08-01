# 🏥 Calculadora de IMC - Portfolio Project

Uma aplicação moderna e responsiva para cálculo de Índice de Massa Corporal (IMC) desenvolvida com Next.js, TypeScript e Tailwind CSS.

## ✨ Características

### 🎨 Design Moderno
- Interface limpa e intuitiva com gradientes e glassmorphism
- Animações suaves e transições elegantes
- Design totalmente responsivo para todos os dispositivos
- Tema consistente com cores profissionais

### 🚀 Funcionalidades Avançadas
- **Cálculo preciso de IMC** com validações em tempo real
- **Classificação automática** baseada nos padrões da OMS
- **Histórico de cálculos** com persistência local
- **Sistema de busca** e filtros no histórico
- **Edição e exclusão** de registros
- **Estatísticas em tempo real** (IMC médio, total de registros)

### 🛡️ Validações Robustas
- Validação de entrada em tempo real
- Feedback visual para campos válidos/inválidos
- Limites realistas para peso (20-300kg) e altura (0.5-3m)
- Prevenção de valores impossíveis

### 📱 Experiência do Usuário
- Feedback visual imediato
- Estados de carregamento
- Mensagens de erro claras
- Navegação intuitiva
- Acessibilidade melhorada

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com SSR
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Tailwind CSS 4** - Framework CSS utilitário
- **React 19** - Biblioteca de interface
- **LocalStorage** - Persistência de dados local

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/calc-imc.git
cd calc-imc
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx      # Botão customizado
│   ├── Campform.tsx    # Campo de formulário
│   ├── Layout.tsx      # Layout principal
│   └── Tableimc.tsx    # Tabela de classificação
├── pages/              # Páginas da aplicação
│   ├── calcimc/        # Página da calculadora
│   ├── dataimc/        # Página do histórico
│   └── index.tsx       # Página inicial
└── styles/             # Estilos globais
    └── globals.css     # CSS global e animações
```

## 🎯 Funcionalidades Principais

### Calculadora de IMC
- Interface intuitiva para entrada de dados
- Cálculo automático com validações
- Exibição clara do resultado
- Classificação visual da categoria

### Sistema de Histórico
- Persistência local dos dados
- Busca e filtros
- Edição e exclusão de registros
- Estatísticas em tempo real

### Tabela de Classificação
- Referência completa da OMS
- Destaque da categoria atual
- Informações detalhadas
- Design responsivo

## 🎨 Componentes Principais

### Button
Componente de botão reutilizável com múltiplas variantes:
- `primary`, `secondary`, `success`, `danger`, `outline`
- Estados: `loading`, `disabled`
- Tamanhos: `sm`, `md`, `lg`

### Campform
Campo de formulário com validações:
- Validação em tempo real
- Feedback visual
- Suporte a unidades
- Limites configuráveis

### Layout
Layout responsivo com:
- Header com navegação
- Footer informativo
- Design glassmorphism
- Animações suaves

## 📊 Classificação do IMC

| Classificação | IMC | Descrição |
|---------------|-----|-----------|
| Abaixo do Peso | < 18.5 | Peso abaixo do recomendado |
| Peso Normal | 18.5 - 24.9 | Peso saudável |
| Sobrepeso | 25 - 29.9 | Peso acima do recomendado |
| Obesidade Grau I | 30 - 34.9 | Obesidade leve |
| Obesidade Grau II | 35 - 39.9 | Obesidade moderada |
| Obesidade Grau III | ≥ 40 | Obesidade grave |

## 🔧 Configuração de Desenvolvimento

### Variáveis de Ambiente
Crie um arquivo `.env.local` para configurações locais:

```env
NEXT_PUBLIC_APP_NAME="Calculadora de IMC"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### Estrutura de Dados

```typescript
interface IMCEntry {
  id: string;
  name: string;
  weight: number;
  height: number;
  imc: number;
  date: string;
  category: string;
}
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- **Netlify**: Compatível com Next.js
- **Railway**: Deploy simples
- **Heroku**: Suporte completo

## 📈 Melhorias Futuras

- [ ] Autenticação de usuários
- [ ] Sincronização com backend
- [ ] Gráficos de evolução
- [ ] Exportação de dados
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
- [ ] Notificações push
- [ ] Integração com APIs de saúde

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)
- Portfolio: [Seu Portfolio](https://seu-portfolio.com)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pela excelente documentação
- [Tailwind CSS](https://tailwindcss.com/) pelo framework CSS
- [TypeScript](https://www.typescriptlang.org/) pela tipagem estática
- Comunidade open source por todas as contribuições

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
