use anyhow::Result;
use axum::{routing::get, Router};
use tokio::net::TcpListener;
use tracing::info;

const ADDR: &str = "0.0.0.0:9191";
#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();

    let app = Router::new().route("/", get(|| async { "Hello, World!" }));

    info!("Started server at \"{ADDR}\"");
    let listener = TcpListener::bind(ADDR).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
