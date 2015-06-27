# Makefile for deployment

PYTHON        = python

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  deploy_site                 deploy complete production environment"
	@echo "  backup_vagrantbox_dev       fetch dbdump from devbox"
	@echo "  restore_to_production       apply dbdump to production system"

.PHONY: docs

deploy_site: ; ansible-playbook ansible/site.yml -i ansible/inventory --vault-password-file ansible/.vault_pass.txt --limit trivago2015
backup_vagrantbox_dev: ; ansible-playbook ansible/postgres_backup.yml -i ansible/inventory --vault-password-file ~/.vault_pass.txt --extra-vars "db_dump_file=proxepta.dump host_name=vagrantbox_dev" --limit vagrantbox_dev
restore_to_production: ; ansible-playbook ansible/postgres_restore.yml -i ansible/inventory --vault-password-file ~/.vault_pass.txt --extra-vars "db_dump_file=proxepta.dump db_password=proxepta db_user=trivago" --limit proxepta
