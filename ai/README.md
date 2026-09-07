# RakthaSethu AI Service

This service hosts the modular donor matching engine.

## Current status
- Exposes health endpoint and donor ranking API.
- Uses a transparent rule-based algorithm for compatibility scoring.
- Structured so a trained ML model can replace the rule engine later without changing API contracts.

## Run locally
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
