# liiist - all about Front-end

#### 1. **Struttura delle Pagine (Routes)**
   - **User Page (`/user`)** - **Working**:
     - Mostra le liste della spesa salvate dall'utente. (pages/api/shopping-lists.ts)
     - Permette di visualizzare, creare nuove liste e accedere al profilo.
     - **Work In Progress**: miglioramenti per la gestione della posizione dell'utente e navigazione verso altre modalità di visualizzazione delle liste.

   - **Pagina di Selezione della Posizione (`/location-selection`)**:
     - **Working**:
       - Visualizza una mappa con Google Maps API.
       - Rileva automaticamente la posizione dell'utente usando la geolocalizzazione.
       - Input manuale della posizione con suggerimenti tramite Google Places API.
     - **Not Working**:
       - I marker dei supermercati non vengono aggiornati dinamicamente quando la mappa viene spostata.
       - Visualizzazione dei supermercati tramite JSON Server (`http://localhost:3001/supermarkets`).
       - I supermercati non vengono aggiornati automaticamente in base all'area visibile della mappa quando l'utente la sposta.

   - **Nuova Lista (`/new-list`)** - **Working**:
     - Permette agli utenti di inserire i nomi dei prodotti, impostare un budget e selezionare la modalità (Risparmio/Comodità).
     - Permette di salvare la lista per utilizzi futuri o di calcolare immediatamente le opzioni ottimali.
     - **Work In Progress**: La logica di calcolo delle modalità Risparmio/Comodità è ancora in sviluppo.

   - **Convenience Mode (`/convenience-mode`)** - **Work In Progress**:
     - Mostra una singola opzione di supermercato ottimizzata per la comodità dell'utente, con i prodotti disponibili e il costo totale.
     - Richiede miglioramenti per la gestione dell'aggiornamento dinamico delle informazioni sui prodotti.

   - **Savings Mode (`/savings-mode`)** - **Work In Progress**:
     - Divide la lista della spesa tra vari supermercati per ottimizzare il risparmio.
     - Necessita di miglioramenti per gestire le informazioni dinamiche e ottimizzare la visualizzazione.

   - **Pagina del Supermercato (`/supermarket/[supermarketId]`)** - **Not Implemented/Work In Progress**:
     - Mostrare informazioni specifiche sul supermercato selezionato.

   - **Pagina del Profilo Utente (`/profile`)** - **Not Implemented/Work In Progress**:
     - Mostrare i dettagli del profilo utente e le opzioni di gestione.

#### 2. **Componenti Creati**
Perfetto, ecco una descrizione dettagliata dei componenti che hai nel progetto.

### **Componenti Creati**

1. **`/ui` - Componenti di Interfaccia Utente**
   - **`tag-input.tsx`**:
     - **Descrizione**: Un componente di input che permette all'utente di aggiungere tag (prodotti nel caso di una lista di spesa). Consente l'inserimento rapido di elementi che possono essere visualizzati come "chip" interattivi.
     - **Funzionalità**: Aggiungere nuovi tag tramite input, cancellare tag esistenti e gestire i tag come un array dinamico.

   - **`input.tsx`**:
     - **Descrizione**: Un componente di input generico. Viene utilizzato per raccogliere dati semplici, come il nome della lista o il budget.
     - **Funzionalità**: Supporta vari tipi di input (`text`, `number`, ecc.) e include attributi per la validazione.

   - **`card.tsx`**:
     - **Descrizione**: Rappresenta un componente contenitore visivo utilizzato per raggruppare elementi correlati, come le informazioni di una lista di spesa o dettagli sul supermercato.
     - **Funzionalità**: Contiene header, contenuti e permette di creare sezioni ben definite. Utilizza anche `Card.module.css` per la personalizzazione visiva.

   - **`button.tsx`**:
     - **Descrizione**: Un componente bottone generico utilizzato per azioni come il salvataggio, la modifica o la navigazione.
     - **Funzionalità**: Accetta diverse proprietà per personalizzare il comportamento, come `onClick`, `type`, `disabled`. È stilizzato con `Button.module.css`.

   - **`ToggleSwitch.tsx`**:
     - **Descrizione**: Un componente commutatore utilizzato per passare tra modalità diverse, come "Risparmio" e "Comodità".
     - **Funzionalità**: Cambia stato tra due opzioni predefinite. Stilizzato con `ToggleSwitch.module.css` per migliorare l'aspetto visivo e l'esperienza utente.

   - **`ActionButton.tsx`**:
     - **Descrizione**: Un bottone con uno stile particolare utilizzato per azioni specifiche, come iniziare un nuovo processo o confermare una scelta.
     - **Funzionalità**: Include stili ed effetti visivi per distinguersi da altri pulsanti di azione minore.

   - **File CSS associati**:
     - **`ToggleSwitch.module.css`**, **`Card.module.css`**, **`Button.module.css`**: Contengono gli stili specifici per ciascuno dei componenti di interfaccia utente, con l'obiettivo di mantenere una consistenza visiva e migliorare l'esperienza utente.

2. **`/map` - Componente di Mappa**
   - **`Map.tsx`**:
     - **Descrizione**: Un componente che integra Google Maps per visualizzare i supermercati e la posizione dell'utente.
     - **Funzionalità**: Utilizza `@react-google-maps/api` per gestire la mappa, mostrare la posizione dell'utente e i supermercati vicini. Supporta la geolocalizzazione e la gestione degli errori di caricamento.

3. **`ProductList.tsx`**:
   - **Descrizione**: Un componente che mostra un elenco di prodotti all'interno di una lista di spesa.
   - **Funzionalità**: Visualizza i prodotti in modo dettagliato, incluse informazioni come il nome, la quantità, e il prezzo. Include anche opzioni per modificare o eliminare i prodotti.

4. **`ProductList.module.css`**:
   - **Descrizione**: File CSS che definisce lo stile visivo per il componente `ProductList`.
   - **Funzionalità**: Include regole per l'aspetto visivo della lista di prodotti, gestendo margini, padding, layout, e stili per le azioni come:
   - Modifica (**Working**)
   - Eliminazione dei prodotti - **(Not Working)**
#### 3. **Funzionalità Implementate**
   - **Caricamento Dinamico dei Supermercati** - **Work In Progress**:
     - I supermercati non vengono aggiornati correttamente quando la mappa viene spostata.
     - Supermercati caricati staticamente da JSON Server (`http://localhost:3001/supermarkets`).

   - **Geolocalizzazione dell'Utente** - **Working**:
     - Rileva automaticamente la posizione dell'utente e mostra i supermercati vicini.
     - Alternativa: l'utente può inserire manualmente la posizione se la geolocalizzazione viene negata.

   - **Inserimento Manuale della Posizione** - **Working**:
     - Possibilità di inserire manualmente la posizione.
     - Suggerimenti di indirizzo tramite Google Places API con autocomplete.
     - Design migliorato con un campo di input intuitivo e pulsante di conferma.

#### 4. **Integrazione API e Endpoint Creati**
   - **Endpoint Creati**:
     - `/api/shopping-lists` - **Working**: Per ottenere le liste della spesa dell'utente e salvarne di nuove.
     - `/api/shopping-lists/[id]` - **Working**: Per ottenere (visualizzare), aggiornare o eliminare una lista specifica.
     - `/api/nearby-supermarkets` - **Working**: Per ottenere i supermercati vicini in base alla posizione dell'utente o alle modifiche della mappa. (obsoleta)
     - `/api/calculate-list` - **Working**: Simula il calcolo dei prodotti consigliati in base a prezzi casuali per la lista dell'utente.
     - `/api/user-profile` - **Not Implemented**: Per gestire il profilo utente (non ancora disponibile).
     - `http://localhost:3001/supermarkets` - **Working**: JSON Server - Fornisce un endpoint per i dati dei supermercati.
	 - `/pages/api/database.ts` - **Working**: Fake db per gestire le liste.

---

### Schema delle Pagine, Componenti e API

#### **Pagine (Routes)**
1. **`/user`** - **Working**: Lista delle spese e accesso alla home.
2. **`/location-selection`** - **Working😁/Not Working😔**:
   - Funzionante per visualizzare la mappa e ottenere la posizione dell'utente.
   - **Not Working**: Caricamento e aggiornamento marker dinamici.
3. **`/new-list`** - **v1.0 Available😁**: Permette la creazione, il salvataggio e il calcolo di una lista con diverse modalità.
4. **`/convenience-mode`** - **v1.0 Available😁**: Ottimizzazione per la comodità dell'utente.
5. **`/savings-mode`** - **v1.0 Available😁**: Ottimizzazione per il risparmio dell'utente.
6. **`/supermarket/[supermarketId]`** - **Work In Progress Not Implemented**.
7. **`/profile`** - **Work In progress/ Not Implemented**.
8. **`/shopping-list/[id]`** - **Working**: Visualizzazione dettagliata della lista di spesa con opzioni per modificarla o passare alle modalità di risparmio/comodità.

#### **Componenti**
1. **`Map.tsx`**
   - **Status**: **Working/Not Working**.
   - Visualizzazione della mappa funzionante, ma marker dinamici non aggiornati correttamente.

#### **API/Endpoint** (Front-end Testing)
1. **`/api/shopping-lists.ts`** - **Working**.
2. **`/api/shopping-lists/[id].ts`** - **Working**.
3. **`/api/database.ts`** - **🥳Working**.
4. **`/api/list-result.ts`** - **🥳Working**.
5. **`/api/nearby-supermarkets.ts`** - **Working**.
6. **`/api/calculate-list`** - **Working**.
7. **`/api/user`** - **Mocked user data**.
8. **`http://localhost:3001/supermarkets`** JSON Server - **Working**.

---

### Come Compilare il Progetto

Per compilare il progetto *liiist*, segui questi passi:

1. **Installare le Dipendenze**:
   ```bash
   npm install
   ```

2. **Configurare le Variabili d'Ambiente**:
   - Crea un file `.env` con le configurazioni necessarie, come API keys e URL del database.

3. **Avviare il Server JSON**:
   ```bash
   json-server --watch db.json --port 3001
   ```
   - L'endpoint per i supermercati sarà accessibile su `http://localhost:3001/supermarkets`.

4. **Avviare l'Applicazione**:
   ```bash
   npm run dev
   ```
   - L'applicazione sarà accessibile su `http://localhost:3000`.
   - User Page su `http://localhost:3000/user`.
---
## **Flusso di Navigazione di Liiist**

Descrizione completa del flusso di navigazione per l**iiist**, basata sulle diverse pagine che l'utente può utilizzare. Questa panoramica include (in linea generale) gli elementi chiave e la navigazione per ogni pagina, includendo **gestione degli errori, stati di caricamento e accessibilità**.

### **1. User Homepage**

- **Descrizione**: Pagina principale dell'utente, mostra tutte le liste salvate e l'opzione per crearne una nuova.
- **Elementi Chiave**:
    - **Posizione Utente**: Mostra la posizione attuale dell'utente (es. "via Bernardino Lotti 7"). Se la posizione non è disponibile, viene visualizzato un messaggio di errore o un prompt per inserire manualmente la posizione.
    - **Avatar Utente**: Icona che permette l'accesso alla **User Profile Page**.
    - **Le mie Liste**: Elenco delle liste di spesa precedenti (es. "lista di Pasqua", "lista di spesa weekend"). Include:
        - (1) Nome della Lista
        - (2) Data di Creazione & Ultima Modifica
        - (3) Budget impostato per la lista
    - **Bottone "New List"**: Pulsante per iniziare una nuova lista.
- **Gestione degli Stati**:
    - Se non sono presenti liste, mostra un messaggio di benvenuto e un pulsante per creare la prima lista.
    - Indicatore di caricamento quando le liste vengono recuperate dal server.
- **Navigazione**:
    - Tap sulla posizione ➞ **Location Selection Page**.
    - Tap su una lista ➞ **Shopping List Page**.
    - Tap su "New List" ➞ **New List Page**.
    - Tap sull'avatar utente ➞ **User Profile Page**.

---

### **2. Location Selection Page**

- **Descrizione**: Permette all'utente di selezionare o confermare la propria posizione e visualizzare i supermercati vicini.
- **Elementi Chiave**:
    - **Lista Supermercati Vicini**: Mostra un elenco dei supermercati nelle vicinanze (es. Conad, Tigre, Gross). Se non ci sono supermercati trovati, viene visualizzato un messaggio di errore.
    - **Mappa Interattiva**: Integrazione con Google Maps per visualizzare i supermercati su una mappa. In caso di errore di caricamento della mappa, viene mostrato un avviso.
    - **Inserimento Posizione Manuale**: Opzione per inserire manualmente la posizione.
- **Gestione degli Stati**:
    - Mostrare un indicatore di caricamento mentre si cercano i supermercati.
    - Gestione degli errori di geolocalizzazione con un messaggio per l'utente.
- **Navigazione**:
    - Tap su un supermercato mostrato sulla mappa o selezione da lista ➞ **Supermarket Page**.
    - Tap su un pin della mappa ➞ **Supermarket Page** o dettagli della posizione.

---

### **3. Supermarket Page**

- **Descrizione**: Visualizza dettagli specifici di un supermercato, con la possibilità di cercare prodotti e creare una lista di spesa per quel supermercato.
- **Elementi Chiave**:
    - **Dettagli Supermercato**: Nome, posizione (es. "via Roma 12"), orari di apertura. Se gli orari non sono disponibili, mostra un messaggio alternativo.
    - **Logo/Icona Supermercato**: Mostra il logo del supermercato.
    - **Bottone "Crea Lista Spesa"**: Avvia la creazione di una lista spesa specifica per quel supermercato.
    - **Motore di Ricerca Prodotti**: Barra di ricerca per trovare prodotti nel supermercato. Se non ci sono risultati, mostra un messaggio di avviso.
    - **Prodotti in Evidenza**: Visualizza prodotti di punta o in promozione. Se non ci sono prodotti in evidenza, nascondere questa sezione.
- **Gestione degli Stati**:
    - Indicatore di caricamento per i prodotti in promozione e per il motore di ricerca.
    - Messaggio di errore se i dettagli del supermercato non sono recuperabili.
- **Navigazione**:
    - Tap su "Crea Lista Spesa" ➞ **New List Page**.
    - Cerca un prodotto ➞ Visualizza risultati all'interno del supermercato.

---

### **4. User Profile Page**

- **Descrizione**: Permette all'utente di gestire i dettagli dell'account, visualizzare tutte le liste e fare modifiche all'account.
- **Elementi Chiave**:
    - **Informazioni Utente**: Nome, gestione tessere fedeltà, modifica password, logout.
    - **Elenco Liste**: Visualizza le liste dell'utente (come nella homepage). Se non sono presenti liste, viene mostrato un messaggio appropriato.
- **Gestione degli Stati**:
    - Indicatore di caricamento quando si aggiornano i dettagli dell'account.
    - Messaggi di errore per la gestione tessere e modifica password.
- **Navigazione**:
    - Seleziona una lista ➞ **Shopping List Page**.
    - Gestione tessera fedeltà, modifica password e logout ➞ Opzioni per la gestione dell'account.

---

### **5. New List Page**

- **Descrizione**: Permette di creare una nuova lista di spesa aggiungendo prodotti e impostando un budget.
- **Elementi Chiave**:
    - **Titolo della Lista**: Titolo della lista della spesa (se non si aggiunge nulla, la lista avrà un nome di default, tipo: "NuovaLista1", "NuovaLista2", ecc.).
    - **Campo di Input Prodotti**: (Tag Editor) Inserimento dei prodotti uno alla volta, che vengono aggiunti dinamicamente alla lista.
        - **Tag Input**: Ogni prodotto viene aggiunto come testo in una lista, elemento per elemento, con un'icona di eliminazione per la rimozione o la modifica.
    - **Campo Budget**: Inserimento del budget massimo per la lista.
    - **Toggle Modalità**: Commutatore tra modalità "risparmio" e "comodità".
    - **Pulsante "Salva Lista"**: Salva la lista corrente e ritorna alla **User Homepage**.
    - **Bottone "Calcola"**: Finalizza la lista in base alla modalità selezionata, mostrando un indicatore di caricamento mentre i risultati vengono calcolati.
- **Gestione degli Stati**:
    - Messaggio di errore se l'invio della lista fallisce.
    - Conferma visiva quando la lista è stata creata con successo.
- **Navigazione**:
    - Premere "Calcola" ➞ (1) **Convenience Mode Page** o (2) **Savings Mode Page** in base alla modalità scelta.
    - Premere "Salva Lista" ➞ **User Homepage**.

---

### **6. Shopping List Page**

- **Descrizione**: Pagina dettagliata di una lista di spesa esistente, con opzioni per modificarla o visualizzarla in modalità risparmio/comodità.
- **Elementi Chiave**:
    - **Titolo della Lista**: Mostra il titolo della lista.
    - **Prodotti**: Elenco dei prodotti aggiunti.
    - **Budget**: Visualizzazione del budget.
    - **Modalità Corrente**: Mostra la modalità di ottimizzazione selezionata ("risparmio" o "comodità").
    - **Azioni**: Pulsanti per modificare la lista, passare alla modalità risparmio o comodità.
- **Gestione degli Stati**:
    - Indicatore di caricamento mentre vengono recuperati i dettagli della lista.
    - Messaggio di errore se non è possibile recuperare i dati della lista.
- **Navigazione**:
    - Tap su "Modifica Lista" ➞ **Edit List Page**.
    - Tap su "Vai a Modalità Risparmio" ➞ **Savings Mode Page**.
    - Tap su "Vai a Modalità Comodità" ➞ **Convenience Mode Page**.

---

### **7. Edit List Page**

- **Descrizione**: Permette di modificare i dettagli di una lista di spesa esistente.
- **Elementi Chiave**:
    - **Titolo della Lista**: Modifica il titolo della lista.
    - **Prodotti**: Modifica, aggiungi o rimuovi prodotti dalla lista.
    - **Budget**: Modifica il budget per la lista.
    - **Pulsante "Salva Modifiche"**: Salva le modifiche e ritorna alla **User Homepage**.
- **Gestione degli Stati**:
    - Indicatore di caricamento durante il salvataggio delle modifiche.
    - Messaggio di errore se il salvataggio fallisce.
- **Navigazione**:
    - Premere "Salva Modifiche" ➞ **User Homepage**.

---

### **8. Convenience Mode Page**

- **Descrizione**: Mostra una singola opzione di supermercato con la lista completa e il costo totale (questo calcolo viene fatto nel back-end).
- **Elementi Chiave**:
    - **Dettagli Supermercato**: Nome, posizione, orari di apertura, mappa (integrazione con Google Maps).
    - **Lista Prodotti**: Prodotti disponibili in quel supermercato con i relativi prezzi.
    - **Costo Totale**: Mostra il costo totale della lista in quel supermercato.
- **Gestione degli Stati**:
    - Indicatore di caricamento per la mappa e per il recupero delle informazioni sul supermercato.
    - Messaggio di errore se non è possibile recuperare i dati del supermercato.
- **Navigazione**:
    - Torna alla **Shopping List Page** per modificare la lista o passare alla modalità Risparmio.

---

### **9. Savings Mode Page**

- **Descrizione**: Ottimizza la spesa dividendo la lista tra più supermercati per ottenere il massimo risparmio (questo calcolo viene fatto nel back-end).
- **Elementi Chiave**:
    - **Sezioni per Supermercato**: Ogni supermercato ha la propria sezione con l'elenco dei prodotti al miglior prezzo.
    - **Dettagli Supermercato**: Nome, posizione, orari di apertura e mappa interattiva.
    - **Lista Prodotti per Supermercato**: Prodotti suddivisi tra i supermercati in base alla convenienza economica.
    - **Display dei Costi**: Mostra il subtotale per ogni supermercato e il totale complessivo.
- **Gestione degli Stati**:
    - Indicatore di caricamento per le informazioni sui supermercati.
    - Messaggio di errore se non è possibile calcolare la suddivisione dei prodotti.
- **Navigazione**:
    - Torna alla **Shopping List Page** per modificare la lista o passare alla modalità Comodità.

---
## Learn More

To learn more about liiist on Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel (Not Working)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
