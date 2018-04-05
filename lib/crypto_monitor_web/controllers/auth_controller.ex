# reference: https://github.com/StephenGrider/ElixirCode/blob/master/discuss/web/controllers/auth_controller.ex
defmodule CryptoMonitor.AuthController do
  use CryptoMonitorWeb, :controller
  plug Ueberauth

  alias CryptoMonitor.Users
  alias CryptoMonitor.Users.User
  alias CryptoMonitor.Repo


  # info: %Ueberauth.Auth.Info{
  #     description: nil,
  #     email: "wangluqi1001@gmail.com",
  #     first_name: nil,
  #     image: "http://graph.facebook.com/215610082529011/picture?type=square",
  #     last_name: nil,
  #     location: nil,
  #     name: "Luqi Wang",
  #     nickname: nil,
  #     phone: nil,
  #     urls: %{
  #       facebook: "https://www.facebook.com/app_scoped_user_id/215610082529011/",
  #       website: nil
  #     }
  # Google:
  # %Ueberauth.Auth.Info{
  #   description: nil,
  #   email: "wangluqi1001@gmail.com",
  #   first_name: "",
  #   image: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
  #   last_name: "",
  #   location: nil,
  #   name: "",
  #   nickname: nil,
  #   phone: nil,
  #   urls: %{profile: nil, website: nil}
  # }
  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, params) do
    IO.puts('***************')
    IO.inspect(auth.info)
    IO.puts('***************')
    user_params = %{token: auth.credentials.token, email: auth.info.email, provider: auth.provider|>Atom.to_string}
    changeset = User.changeset(%User{}, user_params)

    signin(conn, changeset)
  end

  def signout(conn, _params) do
    conn
    |> configure_session(drop: true)
    |> redirect(to: page_path(conn, :index))
  end

  defp signin(conn, changeset) do
    case insert_or_update_user(changeset) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Welcome back!")
        |> put_session(:user_id, user.id)
        |> redirect(to: page_path(conn, :index))
      {:error, _reason} ->
        conn
        |> put_flash(:error, "Error signing in")
        |> redirect(to: page_path(conn, :index))
    end
  end

  defp insert_or_update_user(changeset) do
    case Repo.get_by(User, email: changeset.changes.email, provider: changeset.changes.provider) do
      nil ->
        Repo.insert(changeset)
      user ->
        {:ok, user}
    end
  end
end
