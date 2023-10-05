from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in erpstorefront_version2/__init__.py
from erpstorefront_version2 import __version__ as version

setup(
	name="erpstorefront_version2",
	version=version,
	description="erpnext_storefront",
	author="mark",
	author_email="mark@mail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
