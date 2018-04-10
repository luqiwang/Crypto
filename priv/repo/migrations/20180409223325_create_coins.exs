defmodule CryptoMonitor.Repo.Migrations.CreateCoins do
  use Ecto.Migration

  def change do
    create table(:coins) do
      add :code, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:coins, [:user_id])
  end
end
