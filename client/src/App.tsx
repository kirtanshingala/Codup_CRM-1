import {
  type AuthProvider,
  Authenticated,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import {
  AuthPage,
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  useNotificationProvider,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons-react";
import { ItemsCreate, ItemsEdit, ItemsList, ItemsShow, PostCreate, PostEdit, PostList, PostShow, RoleCreate, RoleEdit, UserCreate } from "./pages";
import { UserList } from "./pages/users/list";
import { UserEdit } from "./pages/users/edit";
import { UserShow } from "./pages/users/show";
import { RoleList } from "./pages/role/list";
import { RoleShow } from "./pages/role/show";
import customDataProvider from "./providers/dataProvider";

/**
 *  mock auth credentials to simulate authentication
 */
const authCredentials = {
  email: "demo@refine.dev",
  password: "demodemo",
};

const App: React.FC = () => {
  const authProvider: AuthProvider = {
    login: async ({ providerName, email }) => {
      // if (providerName === "google") {
      //   window.location.href = "https://accounts.google.com/o/oauth2/v2/auth";
      //   return {
      //     success: true,
      //   };
      // }

      // if (providerName === "github") {
      //   window.location.href = "https://github.com/login/oauth/authorize";
      //   return {
      //     success: true,
      //   };
      // }

      if (email === authCredentials.email) {
        localStorage.setItem("email", email);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    },
    register: async (params) => {
      if (params.email === authCredentials.email && params.password) {
        localStorage.setItem("email", params.email);
        return {
          success: true,
          redirectTo: "/",
        };
      }
      return {
        success: false,
        error: {
          message: "Register failed",
          name: "Invalid email or password",
        },
      };
    },
    updatePassword: async (params) => {
      if (params.password === authCredentials.password) {
        //we can update password here
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: "Invalid password",
        },
      };
    },
    forgotPassword: async (params) => {
      if (params.email === authCredentials.email) {
        //we can send email with reset password link here
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: {
          message: "Forgot password failed",
          name: "Invalid email",
        },
      };
    },
    logout: async () => {
      localStorage.removeItem("email");
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return { error };
    },
    check: async () =>
      localStorage.getItem("email")
        ? {
            authenticated: true,
          }
        : {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Not authenticated",
            },
            logout: true,
            redirectTo: "/login",
          },
    getPermissions: async () => ["admin"],
    getIdentity: async () => ({
      id: 1,
      name: "Jane Doe",
      avatar:
        "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
    }),
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <ChakraProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={customDataProvider("http://localhost:5000/api")}
          authProvider={authProvider}
          routerProvider={routerProvider}
          notificationProvider={useNotificationProvider()}
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              edit: "/posts/edit/:id",
              create: "/posts/create",
            },
            {
              name: "master",
              meta: { label: "Master" },
            },
            {
              name: "users",
              list: "/users",
              show: "/users/show/:id",
              edit: "/users/edit/:id",
              create: "/users/create",
              meta: { parent: "master", canDelete: true },
            },
            {
              name: "role",
              list: "/role",
              show: "/role/show/:id",
              edit: "/role/edit/:id",
              create: "/role/create",
              meta: { parent: "master", canDelete: true },
            },
            {
              name: "items",
              list: "/items",
              show: "/items/show/:id",
              edit: "/items/edit/:id",
              create: "/items/create",
              meta: { parent: "master", canDelete: true },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<NavigateToResource resource="posts" />} />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>

              <Route index element={<NavigateToResource resource="users" />} />

              <Route path="/users">
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
                <Route path="edit/:id" element={<UserEdit />} />
                <Route path="show/:id" element={<UserShow />} />
              </Route>

              <Route index element={<NavigateToResource resource="role" />} />

              <Route path="/role">
                <Route index element={<RoleList />} />
                <Route path="create" element={<RoleCreate />} />
                <Route path="edit/:id" element={<RoleEdit />} />
                <Route path="show/:id" element={<RoleShow />} />
              </Route>
              <Route index element={<NavigateToResource resource="items" />} />

              <Route path="/items">
                <Route index element={<ItemsList />} />
                <Route path="create" element={<ItemsCreate />} />
                <Route path="edit/:id" element={<ItemsEdit />} />
                <Route path="show/:id" element={<ItemsShow />} />
              </Route>
            </Route>

            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource resource="posts" />
                  <NavigateToResource resource="users" />
                  <NavigateToResource resource="role" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      defaultValues: {
                        ...authCredentials,
                      },
                    }}
                  // providers={[
                  //   {
                  //     name: "google",
                  //     label: "Sign in with Google",
                  //     icon: <IconBrandGoogle />,
                  //   },
                  //   {
                  //     name: "github",
                  //     label: "Sign in with GitHub",
                  //     icon: <IconBrandGithub />,
                  //   },
                  // ]}
                  />
                }
              />
              {/* <Route
                path="/register"
                element={
                  <AuthPage
                    type="register"
                    providers={[
                      {
                        name: "google",
                        label: "Sign in with Google",
                        icon: <IconBrandGoogle />,
                      },
                      {
                        name: "github",
                        label: "Sign in with GitHub",
                        icon: <IconBrandGithub />,
                      },
                    ]}
                  />
                }
              /> */}
              <Route
                path="/forgot-password"
                element={<AuthPage type="forgotPassword" />}
              />
              <Route
                path="/update-password"
                element={<AuthPage type="updatePassword" />}
              />
            </Route>

            <Route
              element={
                <Authenticated key="catch-all">
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
