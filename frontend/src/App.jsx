import { RouterProvider } from "react-router-dom";

import router from './routes/index';
import { PostFilterContextProvider } from "./contexts/PostFilterContext";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();

export default function App() {
  return (
    <PostFilterContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PostFilterContextProvider>
  );
}