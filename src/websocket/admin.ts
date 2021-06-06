import { io } from "../http";
import { ConnectionsServices } from "../services/ConnectionsServices";
import { MessagesServices } from "../services/MessagesServices";
import { SettingsServices } from "../services/SettingsService";

let username = "admin";

io.on("connect", async (socket) => {
  const connectionsServices = new ConnectionsServices();
  const messagesServices = new MessagesServices();
  const settingsServices = new SettingsServices();

  const allConnectionsWithoutAdmin =
    await connectionsServices.findByWithoutAdmin();

  io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { user_id } = params;

    const allMessages = await messagesServices.listByUser(user_id);

    callback(allMessages);
  });
  socket.on("admin_send_message", async (params) => {
    const { user_id, text } = params;
    const { id } = await settingsServices.findByUsername(username);
    await messagesServices.create({
      user_id,
      text,
      admin_id: id,
    });
    const { socket_id } = await connectionsServices.findByUserId(user_id);
    io.to(socket_id).emit("admin_send_to_client", {
      text,
      socket_id: socket.id,
    });
  });
  socket.on("admin_user_in_support", async (params) => {
    const { user_id } = params;
    const { id } = await settingsServices.findByUsername(username);
    let admin_id = id;
    await connectionsServices.updateAdminId(user_id, admin_id);

    const allConnectionsWithoutAdmin =
      await connectionsServices.findByWithoutAdmin();
    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
  });
});
