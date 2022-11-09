# TrainingBrain

- Se trata de una Web dondo los usuarios pueden subir sus ejercicios a un perfil personal y planificar sus entrenos, guardando asi sus pesos, sus series y sus ejercicios.
- Cada ejercicio tiene nombres, descripcion, numero de series, numero de repeticiones y un peso por cada repeticion.

## Endpoints usuario

- POST - [/users] - Crea un usuario pendiente de activar ✅
- GET - [/users/vaildate/:registrationCode] - Valida un usuario recien registrado ✅
- POST - [/users/login] - Logea un usuario registrando un token ✅
- GET - [/users/:idUser] - Retorna la informacion de un usuario en concreto ✅
- PUT - [/users/:idUser] - Edita informacion del usuario. ✅
- PUT - [/users/:idUser/password] - Edita la password de un usuario. ✅
- PUT - [/users/password/recover] - Envia un correo con el codigo de reseteo de la password a un email ✅
- PUT - [/user/password/reset] - Cambia la password de un usuario con el codigo de reseteo ✅
- DELETE - [/users/:idUser] - Borra un usuario

## training

- POST - [/users/exercise/]
