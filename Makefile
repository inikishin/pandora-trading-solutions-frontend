rerun:
	docker build -t pandora-trading-solutions-frontend .
	docker container stop pandora-trading-solutions-frontend
	docker container rm pandora-trading-solutions-frontend
	docker run --name pandora-trading-solutions-frontend -d --publish 3001:3000 pandora-trading-solutions-frontend
