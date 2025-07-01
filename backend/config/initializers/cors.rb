Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins_list = [ "http://localhost:5173" ]

    if ENV["FRONTEND_URL"].present?
      origins_list << ENV["FRONTEND_URL"]
    end

    origins origins_list

    resource "*",
      headers: :any,
      expose: [ "Authorization" ],
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
