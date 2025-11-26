 ## 12.11.
 #### Sain navigaation aikaan ja aluksi oli ongelmia expon version kanssa ja sitten navigaatio valitti puuttuvasta id:stä.
 #### Tämän kiersin säätämällä tsconfigia.

 ## 21.11.
 #### Sain tehtyä ajastimen.
 #### Piti oppia käyttämään uusia kirjastoja kuten:
 ### react-native-timer-picker
 ### expo-linear-gradient
 ### expo-av

 #### timer picker paketin opastus oli tosi hyödyllistä vaikka siinä näytettiin miten tehdä hälytyskello. Pienillä muutoksilla ja lisäämällä ajastinlogiikan sain sen ajastimeksi.


## 22.11. 
#### Sain tehtyä nopan touchableOpacitylla ja lisättyä siihen iconin.
#### Vaihdoin expo-av sta expo-audioon. Ääni soi, jos ajastin menee nollaan.
#### Jäsentelin myös projektia järkevämmäksi ja sain homescreenille näkymään stack.navigaation.


## 23.11.
#### Yhdistin firebasen ja sain luotua siihen pelin jolla nimi, mutta sääntö on tyhjä.
#### Sain navigaation toimimaan hienommin, kun siinä on 2 navigaatiota ja niitä oli hankalaa saada toimimaan samaan aikaan. Tajusin, että kannattaa laittaa tab app.tsx ään ja stack homescreeniin
#### Yritin myös säätää UI-ta tailwindilla, mutta en heti osannut käyttää.

## 24.11.
#### Nyt käytin aikaa tailwindin oppimiseen ja sain UI:n aika lailla kuntoon. Nyt peliin saa syötettyä sääntöjäkin, mutta toistaiseksi vain kirjoittamalla.

## 25.11.
#### meni paljon aikaa uuden firebase app:in luontiin, koska huomasin varoituksesta, että oon laittanut firebase keyn githubiin.
#### Loin tiedostot ja latasin kirjastot rulescanneria varten.


## 26.11.
#### Nyt oli se vaikein osuus. Yritin luoda kameraa, joka lukee teksiä, mutta sen kirjasto ei ollutkaan expo go:n kanssa sopiva, niin yritin saada aikaan mobile emulatoria, mutta mulla ei ollut siihen tilaa koneella. 
#### Päätin yritää buildaa sitä suoraan, mutta tuli haasteita kameran ocr pluginin kanssa. Meni paljon aikaa, testasin monia eri asioita. Kysyin myös AI:lta. AI sanoi, että voisin kokeilla gradlew assembleDebugia. lopuksi sain sen läpi, kun kävin muuttaa yhden rivin siitä ocr pluginista. Nyt yritän taas eas buildia ja kirjoitin tämän tässä, kun pitää odottaa yli tunnin, kun siinä taitaa olla ruuhkaa. Toivon, että kamera toimii hyväksyttävällä tavalla, koska en ole vielä päässyt testaa sitä.



 ## Lähteitä:

 #### https://www.npmjs.com/package/react-native-timer-picker

 #### https://docs.expo.dev/versions/latest/sdk/av/

 #### https://haagahelia.github.io/mobilecourse/docs/intro

 #### https://archive.org/details/soundcloud-980363293