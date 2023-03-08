import Router from "components/Router";
import GlobalStyles from "components/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <GlobalStyles />
    </QueryClientProvider>
  );
};

export default App;
