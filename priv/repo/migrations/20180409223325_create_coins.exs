defmodule CryptoMonitor.Repo.Migrations.CreateCoins do
  use Ecto.Migration

  def change do
    create table(:coins) do
      add :code, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :limit_high, :integer
      add :limit_low, :integer
      timestamps()
    end

    create index(:coins, [:user_id])
  end
end
