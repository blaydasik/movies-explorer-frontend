import React from "react";
import { Navigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

// HOC-компонент
// аргументы - компонент, который будет доступен авторизованным пользователям
// и пропсы, передававаемые внутрь
export function ProtectedRoute({ component: Component, ...props }) {
  // подпишемся на контекст текущего пользователя
  const { loggedIn } = React.useContext(CurrentUserContext);
  const resultComponent = loggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
  return resultComponent;
}

export function UnProtectedRoute({ component: Component, ...props }) {
  // подпишемся на контекст текущего пользователя
  const { loggedIn } = React.useContext(CurrentUserContext);
  const resultComponent = !loggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
  return resultComponent;
}
