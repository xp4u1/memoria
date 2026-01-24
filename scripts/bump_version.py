import json
import os
import re
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent
PACKAGE_JSON = WORKSPACE / "package.json"
BUILD_GRADLE = WORKSPACE / "android" / "app" / "build.gradle"
PROJECT_PBX = WORKSPACE / "ios" / "App" / "App.xcodeproj" / "project.pbxproj"

GRADLE_VERSION_CODE = re.compile(r"^\s*versionCode (\d+)$")
GRADLE_VERSION_NAME = re.compile(r'^\s*versionName "([\d.]+)"$')
XCODE_VERSION_CODE = re.compile(r"^\s*CURRENT_PROJECT_VERSION = (\d+);$")
XCODE_VERSION_NAME = re.compile(r"^\s*MARKETING_VERSION = ([\d.]+);$")


def get_current_version() -> str:
    """
    Read the current version from package.json
    """
    with open(PACKAGE_JSON, "r") as file:
        package = json.load(file)
        return package["version"]


def extract_string(path: Path, pattern: re.Pattern[str]) -> str:
    """
    Extract a string from a file. Returns the first match group
    of the given regex
    """

    with open(path, "r") as file:
        for line in file:
            match = re.match(pattern, line)
            if match:
                return match.group(1)

    raise RuntimeError("Unable to find version pattern")


def replace_in_file(path: Path, pattern: re.Pattern[str], text: str):
    """
    Replace a the first capture group of the attern with a given text
    """

    with open(path, "r+") as file:
        lines = file.readlines()
        file.seek(0)
        file.writelines(
            [
                re.sub(
                    pattern,
                    lambda match: match.group(0).replace(match.group(1), text),
                    line,
                )
                for line in lines
            ]
        )
        file.truncate()


def update_android(version: str) -> None:
    version_code = int(extract_string(BUILD_GRADLE, GRADLE_VERSION_CODE))
    version_name = extract_string(BUILD_GRADLE, GRADLE_VERSION_NAME)

    print("Updating Android:")

    print(f"- Bump version code: {version_code} -> {version_code + 1}")
    replace_in_file(BUILD_GRADLE, GRADLE_VERSION_CODE, str(version_code + 1))

    print(f"- Replace version name: {version_name} -> {version}")
    replace_in_file(BUILD_GRADLE, GRADLE_VERSION_NAME, version)


def update_ios(version: str) -> None:
    version_code = int(extract_string(PROJECT_PBX, XCODE_VERSION_CODE))
    version_name = extract_string(PROJECT_PBX, XCODE_VERSION_NAME)

    print("Updating iOS:")

    print(f"- Bump version code: {version_code} -> {version_code + 1}")
    replace_in_file(PROJECT_PBX, XCODE_VERSION_CODE, str(version_code + 1))

    print(f"- Replace version name: {version_name} -> {version}")
    replace_in_file(PROJECT_PBX, XCODE_VERSION_NAME, version)


def main() -> None:
    version = get_current_version()

    print(f"Updating to version: {version} (from package.json)\n")
    update_android(version)
    update_ios(version)

    user_input = input("\nDo you want to create a commit? [Y/n] ").strip().lower()
    if user_input != "y" and user_input != "":
        return

    os.system(f"git add {PACKAGE_JSON} {BUILD_GRADLE} {PROJECT_PBX}")
    os.system(f"git commit -m 'chore(release): version {version}'")


if __name__ == "__main__":
    main()
