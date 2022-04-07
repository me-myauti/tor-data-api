# tor-data-api
*PT-BR*: _Essa API recebe IPs TOR de duas URLs distintas, permitindo que o usuario acesse todos os IPs listados de maneira unificada, ou filtrados por meio de uma indicação de IP que não devem aparecer. Essas funcionalidades estão separadas em 3 endpoints que serão listadas abaixo, junto à instrução de uso da API._

*EN-US*: _This API recieves TOR IPs from two different URLs, which can return a list containing all the IPs from both of URLs or a filtered list, by pointing IPs that should not be listed. These functionalities are separated by 3 endpoints, that will be listed below_

# Instalação
```
$ git clone https://github.com/me-myauti/tor-data-api
$ cd tor-data-api
$ npm install
$ node scrapper.js
$ npm start
```
## Utilização
_Para a utilização funcional da API, é necessário algumas configurações e exigências._

* Utilizar Mongo como banco, uma vez que a API cria o Schema e trabalha com a inserção e coleta de dados voltados para o MongoDB
* Definir sua string de conexão com seu banco de dados em database\index.js
* Para o endpoint post, localizado em controllers\banController.js configure o seu redirecionamento para a porta em que seu client-side está rodando. (Por padrão, é utilizado o localhost:3000)

# Endpoints
* **GET** ```/listIps```
   * Retorna uma lista com todos os IPs separados entre **onion** e **tornodes**

* **POST** ```/blacklist/register```
    * Recebe um IP utilizando o método **POST**, realiza a inserção no banco caso o mesmo ainda não tenha sido inserido anteriormente e retorna para uma rota de sua escolha (Citado na descrição de utilização).

* **GET** ```/listBannedIps```
    * Retorna uma lista com todos os IPs **exceto** aqueles que foram inseridos no banco

# Retorno esperado dos endpoints GET
* **/listIps**
    ```
    { 
        onion:[...],
        tornodes[...]
    }
    ```
    
* **/listBannedIps**
  ```
    {
      onion:[...],
      tornodes[...]
    }
  ```

# Logs esperados
* **Para a conexão com o banco de dados**
    * Conexão realizada com sucesso

        ```Database: Connected successfully```
    
    * Conexão realizada sem exito
    
        ```MongoParseError: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"```
    
* **Para a inserção no banco de dados**
    * Ip já presente no banco
    
        ```Status code: 405 - Method not allowed```

    * Falha na inserção
    
        ```Status code: 400 - Registration failed```
    
    * Inserção realizada com sucesso
        ```Status code: 200```
    
* **Para a coleta de dados usando o scrapper**
    * Caso a resposta do acesso à página seja ```200``` teremos duas possibilidades de resposta
        ```Data inserted successfully``` caso a criação do arquivo "ips.json" tenha ocorrido com sucesso e seus dados tenham sido preenchidos corretamente.

        ```Could not create json file``` caso a criação do arquivo "ips.json" tenha passado por algum problema.
        
    * Caso a resposta do acesso à página seja diferente de ```200```
        ```Error rewriting list of ips: You need to wait 30 minutes until the next request. You should check your ips.json file instead```
