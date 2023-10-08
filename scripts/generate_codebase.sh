#!/usr/bin/env bash

ignore_files=".git|README.md|template_config.yaml|node_modules|build"

for input_file in `tree -I "${ignore_files}" -Ffai --noreport`
do
  if [ ! -d "${input_file}" ]; then
    echo "Processing file: ${input_file}"
    gomplate \
         -f "${input_file}" \
         -o "${input_file}" \
         --left-delim "<<[" \
         --right-delim "]>>" \
         -c config=./template_config.yaml
  fi
done

# Clean up / implode
rm README.md
mv README_PROJECT.md README.md
mv .github/workflows/github-actions-final.txt .github/workflows/github-actions.yml
rm generate_codebase.sh template_config.yaml