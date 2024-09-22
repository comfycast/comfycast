use anyhow::Result;
use axum::{routing::get, Json, Router};
use tokio::net::TcpListener;
use tracing::info;
use utoipa::OpenApi;
use utoipa_scalar::{Scalar, Servable as _};

const ADDR: &str = "0.0.0.0:9192";

#[derive(OpenApi)]
#[openapi(paths(pong))]
struct ApiDoc;

async fn openapi() -> Json<utoipa::openapi::OpenApi> {
    Json(ApiDoc::openapi())
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();

    let app = Router::new().nest("/api", api_router());

    info!("Started server at \"{ADDR}\"");
    let listener = TcpListener::bind(ADDR).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

fn api_router() -> Router {
    Router::new()
        .merge(Scalar::with_url("/", ApiDoc::openapi()))
        .route("/openapi.json", get(openapi))
        .route("/ping", get(pong))
}

#[utoipa::path(get, path = "/api/ping")]
async fn pong() -> &'static str {
    "pong"
}
