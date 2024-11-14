# liiist - All about front-end

#### 1. **Struttura delle Pagine (Routes)**
   - **User Page (`/user`)** - **Working**:
     - Mostra le liste della spesa salvate dall'utente. (pages/api/shopping-lists.ts)
     - Permette di visualizzare, creare nuove liste e accedere al profilo. (Not Working/Work In Progress)

   - **Pagina di Selezione della Posizione (`/location-selection`)**:
     - **Working**:
       - Visualizza una mappa con Google Maps API.
       - Rileva automaticamente la posizione dell'utente usando la geolocalizzazione.
       - Input manuale della posizione con suggerimenti tramite Google Places API.
     - **Not Working**:
       - Mostra i marker dinamicamente, aggiornandoli quando la mappa viene spostata.
       - I supermercati vengono aggiornati automaticamente in base all'area visibile della mappa quando l'utente la sposta.

   - **Nuova Lista (`/new-list`)** - **Not Implemented/Work In Progress**:
     - Permette agli utenti di inserire i nomi dei prodotti e impostare un budget.

   - **Convenience Mode (`/convenience-mode`)** - **Not Implemented/Work In Progress**:
     - Mostra una singola opzione di supermercato ottimizzata per la comodità dell'utente.

   - **Savings Mode (`/savings-mode`)** - **Not Implemented/Work In Progress**:
     - Divide la lista della spesa tra vari supermercati per ottimizzare il risparmio.

   - **Pagina del Supermercato (`/supermarket/[supermarketId]`)** - **Not Implemented/Work In Progress**:
     - Mostra informazioni specifiche sul supermercato selezionato.

   - **Pagina del Profilo Utente (`/profile`)** - **Not Implemented/Work In Progress**:
     - Mostra i dettagli del profilo utente e le opzioni di gestione.

#### 2. **Componenti Creati**
   - **Mappa (`components/map/Map.tsx`)**:
     - **Working**:
       - Visualizza Google Maps usando `@react-google-maps/api`.
       - Gestisce stati di caricamento ed errori.
     - **Not Working**:
       - I marker non vengono aggiornati dinamicamente quando l'utente sposta la mappa.

#### 3. **Funzionalità Implementate**
   - **Caricamento Dinamico dei Supermercati** - **Not Working/Work In Progress**:
     - I supermercati non vengono aggiornati correttamente quando la mappa viene spostata.

   - **Geolocalizzazione dell'Utente** - **Working**:
     - Rileva automaticamente la posizione dell'utente e mostra i supermercati vicini.
     - Alternativa: l'utente può inserire manualmente la posizione se la geolocalizzazione viene negata.

   - **Inserimento Manuale della Posizione** - **Working**:
     - Possibilità di inserire manualmente la posizione.
     - Suggerimenti di indirizzo tramite Google Places API con autocomplete.
     - Design migliorato con un campo di input intuitivo e pulsante di conferma.

#### 4. **Integrazione API e Endpoint Creati**
   - **Endpoint Creati**:
     - `/api/shopping-lists` - **Working**: Per ottenere le liste della spesa dell'utente.
     - `/api/nearby-supermarkets` - **Working**: Per ottenere i supermercati vicini in base alla posizione dell'utente o alle modifiche della mappa.
     - `/api/user-profile` - **Not Implemented**: Per gestire il profilo utente (non ancora disponibile).
     - `/api/new-list` - **Not Implemented**: Per la gestione di nuove liste della spesa (non ancora disponibile).

---

### Schema delle Pagine, Componenti e API

#### **Pagine (Routes)**
1. **`/user`** - **Working**: Lista delle spese e accesso al profilo.
2. **`/location-selection`** - **Working/Not Working**:
   - Funzionante per visualizzare la mappa e ottenere la posizione dell'utente.
   - **Not Working**: Caricamento e aggiornamento marker dinamici.
3. **`/new-list`** - **Not Implemented**.
4. **`/convenience-mode`** - **Not Implemented**.
5. **`/savings-mode`** - **Not Implemented**.
6. **`/supermarket/[supermarketId]`** - **Not Implemented**.
7. **`/profile`** - **Not Implemented**.

#### **Componenti**
1. **`Map.tsx`**
Status: **Working/Not Working**:
   - Visualizzazione della mappa funzionante.
   - Marker dinamici **not working**.

#### **API/Endpoint**
1. **`/api/shopping-lists`** - **Working**.
2. **`/api/nearby-supermarkets`** - **Working**.
3. **`/api/user-profile`** - **Not Implemented**.
4. **`/api/new-list`** - **Not Implemented**.

---

### Come Compilare il Progetto

Per compilare il progetto *liiist*, segui questi passi:

1. **Installare le Dipendenze**:
   ```bash
   npm install
   ```

2. **Configurare le Variabili d'Ambiente**:
   - Crea un file `.env` con le configurazioni necessarie, come API keys e URL del database.

5. **Avviare l'Applicazione**:
   ```bash
   npm run dev
   ```
   - L'applicazione sarà accessibile su `http://localhost:3000`.
   - User Page su `http://localhost:3000/user`.
   - User Page su `http://localhost:3000/location-selection`.

---
## **Flusso di Navigazione di Liiist**

Descrizione completa del flusso di navigazione per l**iiist**, basata sulle diverse pagine che l'utente può utilizzare.
Questa panoramica include (in linea generale) gli elementi chiave e la navigazione per ogni pagina, includendo *gestione degli errori, **stati di caricamento e ***accessibilità.

### **1. User Homepage**

- **Descrizione**: Pagina principale dell'utente, mostra tutte le liste salvate e l'opzione per crearne una nuova.
- **Elementi Chiave**:
    - **Posizione Utente**: Mostra la posizione attuale dell'utente (es. "via Bernardino Lotti 7"). Se la posizione non è disponibile, viene visualizzato un messaggio di errore o un prompt per inserire manualmente la posizione.
    - **Avatar Utente**: Icona che permette l'accesso alla **User Profile Page**.
    - **Le mie Liste**: Elenco delle liste di spesa precedenti (es. "lista di pasqua", "lista di spesa weekend"). Include:
        - (1) Nome della Lista
        - (2) Data di Creazione & Ultima Modifica
        - (3) Budget impostato per la lista
        - (4) Colore personalizzato per ogni Lista (predefinito o scelto dall'utente).
    - **Bottone "New List"**: Pulsante per iniziare una nuova lista.
- **Gestione degli Stati**:
    - Se non sono presenti liste, mostra un messaggio di benvenuto e un pulsante per creare la prima lista.
    - Indicatore di caricamento quando le liste vengono recuperate dal server.
- **Navigazione**:
    - Tap sulla posizione ➞ **Location Selection Page**.
    - Tap su una lista ➞ **Pagina Lista Specifica**.
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
    - Seleziona una lista ➞ **Pagina Lista Specifica**.
    - Gestione tessera fedeltà, modifica password e logout ➞ Opzioni per la gestione dell'account.

---

### **5. New List Page**

- **Descrizione**: Permette di creare una nuova lista di spesa aggiungendo prodotti e impostando un budget.
- **Elementi Chiave**:
    - **Titolo della Lista**: Titolo della lista della spesa (se non si aggiunge nulla, la lista avrà un nome di default, tipo: "NuovaLista1", "NuovaLista2", ecc.).
    - **Campo di Input Prodotti**: (Tag Editor) Inserimento dei prodotti uno alla volta, che vengono aggiunti dinamicamente alla lista. (Dynamic List Input & Item List Input)
        - (a) I prodotti vengono aggiunti come testo in una lista, elemento per elemento. (tag input/chip input)
        - (a1) Ogni volta che si preme enter, il prodotto viene aggiunto e visualizzato sotto il campo di input. (tag input/chip input)
        - (a2) Ogni prodotto visualizzato sotto il campo di input ha un'icona di eliminazione per la rimozione o la modifica. (tag input/chip input)
        - (b) La lista dei prodotti viene inviata al back-end per ulteriori elaborazioni.
        - (c) Il back-end ritorna i prodotti consigliati nel supermercato suggerito, in base alla lista inviata.
    - **Campo Budget**: Inserimento del budget massimo per la lista.
    - **Toggle Modalità**: Commutatore tra modalità "risparmio" e "comodità".
    - **Bottone "Calcola"**: Finalizza la lista in base alla modalità selezionata. Mostrare un indicatore di caricamento mentre i risultati vengono calcolati.
- **Gestione degli Stati**:
    - Messaggio di errore se l'invio della lista fallisce.
    - Conferma visiva quando la lista è stata creata con successo.
- **Navigazione**:
    - Premere "Calcola" ➞ (1) **Convenience Mode Page** o (2) **Savings Mode Page** in base alla modalità scelta.

---

### **6. Convenience Mode Page**

- **Descrizione**: Mostra una singola opzione di supermercato con la lista completa e il costo totale (questo calcolo viene fatto nel back-end).
- **Elementi Chiave**:
    - **Dettagli Supermercato**: Nome, posizione, orari di apertura, mappa (integrazione con Google Maps).
    - **Lista Prodotti**: Prodotti disponibili in quel supermercato con i relativi prezzi.
    - **Costo Totale**: Mostra il costo totale della lista in quel supermercato.
- **Gestione degli Stati**:
    - Indicatore di caricamento per la mappa e per il recupero delle informazioni sul supermercato.
    - Messaggio di errore se non è possibile recuperare i dati del supermercato.
- **Navigazione**:
    - Torna alla **New List Page** per modificare la lista o passare alla modalità Risparmio.

---

### **7. Savings Mode Page**

- **Descrizione**: Ottimizza la spesa dividendo la lista tra più supermercati (massimo due) per ottenere il massimo risparmio (questo calcolo viene fatto nel back-end).
- **Elementi Chiave**:
    - **Sezioni per Supermercato**: Ogni supermercato (in totale 2) ha la propria sezione con l'elenco dei prodotti al miglior prezzo.
    - **Dettagli Supermercato**: Nome, posizione, orari di apertura e mappa interattiva.
    - **Lista Prodotti per Supermercato**: Prodotti suddivisi tra i supermercati in base alla convenienza economica.
    - **Display dei Costi**: Mostra il subtotale per ogni supermercato e il totale complessivo.
- **Gestione degli Stati**:
    - Indicatore di caricamento per le informazioni sui supermercati.
    - Messaggio di errore se non è possibile calcolare la suddivisione dei prodotti.
- **Navigazione**:
    - Torna alla **New List Page** per modificare la lista o passare alla modalità Comodità.

---
## Learn More

To learn more about liiist on Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel (Not Working)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
