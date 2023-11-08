#!/bin/zsh
TARGETDIR=/tmp/airport_data
mkdir -p $TARGETDIR

URL=https://raw.githubusercontent.com/davidmegginson/ourairports-data/main/

INFILES=(countries.csv runways.csv navaids.csv regions.csv airport-frequencies.csv airports.csv)
OUTFILES=(Countries.csv Runways.csv Navaids.csv Regions.csv Frequencies.csv Airports.csv)


for (( i = 1; i <= $#INFILES; i++ )) do
    ( # subshell to contain the effect of the chdir
        RAW=$TARGETDIR/in-"${INFILES[i]}"
        CSV=$TARGETDIR/"${OUTFILES[i]}"

        echo "#############################################"
        curl $URL"${INFILES[i]}" > "$RAW"
        sed -e 's/,,/,\\N,/g' -e 's/,,/,\\N,/g' -e 's/,$/,\\N/g' "$RAW" > "$CSV"
        mysqlimport --user=jerryhobby --host='jerryhobby.com' --password='wjb7ETJ*dzr2jeu2wuf' jerryhobby "$CSV" --delete --force --verbose --ignore-lines=1 --fields-terminated-by=',' --fields-enclosed-by='"' --lines-terminated-by='\n'
    )
done
