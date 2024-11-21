
# **README - liiist Front-end Documentation**

---

#### **1. Struttura delle Pagine (Routes)**

##### **User Page (`/user`)** - **Status: Working**
- **Descrizione**:
  - Mostra le liste della spesa salvate dall'utente.
  - Permette di creare nuove liste e **WORK IN PROGRESS:** accedere al profilo utente.
- **Features**:
  - Visualizzazione dinamica delle liste tramite API `/api/shopping-lists`.
  - Navigazione verso modalità specifiche per la gestione delle liste.
  - **Nuovo**: Aggiunta opzione di eliminazione per le liste salvate con un bottone dedicato.
- **Work In Progress**:
  - Miglioramenti nella navigazione e della posizione utente.

---

##### **Pagina di Selezione della Posizione (`/location-selection`)** - **Status: Working/Not Working**
- **Descrizione**:
  - Mostra una mappa interattiva utilizzando Google Maps API.
  - Permette di rilevare automaticamente la posizione dell'utente o di inserire manualmente un indirizzo.
- **Features**:
  - Rilevamento automatico della posizione con geolocalizzazione.
  - Input manuale con suggerimenti tramite Google Places API.
  - Marker statici caricati da JSON Server (`http://localhost:3001/supermarkets`).
- **Work In Progress**:
  - I marker dei supermercati non vengono aggiornati *dinamicamente in base all'area visibile della mappa*.

---

##### **Nuova Lista (`/new-list`)** - **Status: Working**
- **Descrizione**:
  - Permette agli utenti di creare una nuova lista, impostare un budget e selezionare modalità specifiche (Risparmio/Comodità).
- **Features**:
  - Inserimento dinamico dei prodotti tramite `tag-input` con possibilità di specificare **quantità**.
  - Salvataggio della lista e calcolo dei costi tramite `/api/calculate-list`.
  - **Nuovo**: Supporto per aggiungere prodotti con quantità specifiche (es. "Pasta Barilla x2").
  - **Nuovo**: Bottone di eliminazione dei prodotti dalla lista.

---

##### **Visualizzazione Lista (`/shopping-list/[id]`)** - **Status: Working**
- **Descrizione**:
  - Permette agli utenti di visualizzare i dettagli di una lista specifica, di modificarla, di andare in modalità (both) Saving & Convenience.
- **Features**:
  - Accesso alla lista tramite ID unico.
  - Visualizzazione dettagliata di prodotti con quantità e opzioni di modifica.
  - **Nuovo**: Bottone per eliminare singoli prodotti dalla lista.

---

##### **Convenience Mode (`/convenience-mode`)** - **Status: Work In Progress**
- **Descrizione**:
  - Mostra una singola opzione di supermercato con i prodotti disponibili ottimizzata per comodità.
- **Features**:
  - Visualizzazione del costo totale e dei prodotti raccomandati.
  - **Nuovo - in progress**: Supporto per visualizzare quantità per prodotto.
- **Work In Progress**:
  - Test per aggiornamenti dinamici delle informazioni sui prodotti e supermercati.

---

##### **Savings Mode (`/savings-mode`)** - **Status: Work In Progress**
- **Descrizione**:
  - Divide la lista della spesa tra supermercati diversi per ottimizzare il risparmio.
- **Features**:
  - Calcolo del risparmio totale. (in progress)
  - Visualizzazione di ogni supermercato con i relativi prodotti e quantità.
- **Work In Progress**:
  - Test per aggiornamenti dinamici delle informazioni sui prodotti e supermercati.

---

##### **Pagina del Supermercato (`/supermarket/[supermarketId]`)** - **Status: Not Implemented**
- **Descrizione**:
  - Visualizza informazioni dettagliate su un supermercato specifico.

---

##### **Pagina del Profilo Utente (`/profile`)** - **Status: Work In Progress**
- **Descrizione**:
  - Mostra informazioni dell’utente (shopping-lists, settings, logout & in case: fidelity cards) e opzioni di gestione del profilo.

---

#### **2. Componenti Creati**

- **`tag-input.tsx`**:
  - **Descrizione**: Componente per aggiungere prodotti con quantità specifiche a una lista.
  - **Nuovo**: Aggiunto supporto per input dinamico delle quantità (es. "Mela x4").
  - **Funzionalità**:
    - Aggiunta dinamica di tag.
    - Modifica e cancellazione dei tag.
    - Supporto per quantità con visualizzazione chiara nel componente.

- **`input.tsx`**:
  - Componente di input generico per nome lista, budget, ecc.

- **`card.tsx`**:
  - Contenitore visivo per liste e dettagli.

- **`button.tsx`**:
  - Bottone generico per azioni comuni.

- **`ToggleSwitch.tsx`**:
  - Interruttore per cambiare modalità (Risparmio/Comodità).

- **`ActionButton.tsx`**:
  - Bottone specifico per azioni principali.

- **`Map.tsx`**:
  - Visualizza la mappa con marker per supermercati.

- **`ProductList.tsx`**:
  - Mostra un elenco di prodotti all’interno di una lista.
  - **Nuovo**:
    - Bottone di eliminazione accanto a ogni prodotto.

---

#### **3. Funzionalità Implementate**

- **Geolocalizzazione dell'Utente**:
  - Rilevamento automatico della posizione.
  - Inserimento manuale della posizione con autocomplete.

- **Inserimento Dinamico Prodotti**:
  - Tramite `tag-input`, aggiunta e modifica dei prodotti con quantità.

- **Eliminazione Dinamica di Prodotti**:
  - Bottone per rimuovere prodotti dalle liste.

- **Salvataggio e Calcolo della Lista**:
  - Tramite `/api/calculate-list`, calcolo dinamico di costi.

- **Visualizzazione Delle Liste**:
  - Accesso alle liste salvate tramite `/api/shopping-lists`.

---

#### **4. Integrazione API**

- **API Endpoint**:
  - `/api/shopping-lists` - Gestisce le liste della spesa.
  - `/api/shopping-lists/[id]` - Visualizza, modifica o elimina una lista specifica.
  - `/api/calculate-list` - Calcola i costi della lista.
  - `/api/user-profile` - Gestisce il profilo utente (Work In Progress).
  - `http://localhost:3001/supermarkets` - Endpoint statico da JSON Server.

---

#### **5. Tecnologie Utilizzate**

- **Framework**:
  - Next.js
- **Librerie**:
  - `@react-google-maps/api`
  - Google Places API
- **CSS**:
  - CSS Modules
- **Database**:
  - JSON Server per test.

---

#### **6. Come Avviare il Progetto**

1. **Installare le Dipendenze**:
   ```bash
   npm install
   ```

2. **Configurare Variabili d'Ambiente**:
   - Crea `.env` con configurazioni come API Keys.

3. **Avviare JSON Server**:
   ```bash
   json-server --watch db.json --port 3001
   ```

4. **Avviare l'Applicazione**:
   ```bash
   npm run dev
   ```
   L'applicazione sarà accessibile su [http://localhost:3000](http://localhost:3000).

---

**Aggiornato al: 21 Novembre 2024**
