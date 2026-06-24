// Load .env for local test runs. In CI the env vars are provided by the
// workflow, so dotenv simply finds nothing to add (existing vars are kept).
import "dotenv/config";
