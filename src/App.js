import Main from './Main';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <ApolloProvider client={client} >    
      <Main/>
      </ApolloProvider>
    </Router>
  );
}

export default App;
