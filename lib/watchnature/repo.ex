defmodule Watchnature.Repo do
  use Ecto.Repo, otp_app: :watchnature
  use Scrivener, page_size: 10
end
