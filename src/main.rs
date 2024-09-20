use anyhow::Result;
use axum::{routing::get, Json, Router};
use tokio::net::TcpListener;
use tracing::info;
use utoipa::OpenApi;
use utoipa_scalar::{Scalar, Servable as _};

const ADDR: &str = "0.0.0.0:9191";

#[derive(OpenApi)]
#[openapi(paths(pong))]
struct ApiDoc;

async fn openapi() -> Json<utoipa::openapi::OpenApi> {
    Json(ApiDoc::openapi())
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/api/v1/openapi.json", get(openapi))
        .merge(Scalar::with_url("/api", ApiDoc::openapi()))
        .route("/api/v1/ping", get(pong));

    info!("Started server at \"{ADDR}\"");
    let listener = TcpListener::bind(ADDR).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

#[utoipa::path(
    get,
    path = "/api/v1/ping",
    responses(
        (status = 200, description = "Returns pong")
    )
)]
async fn pong() -> &'static str {
    "pong"
}
