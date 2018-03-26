
var Client = require('coinbase').Client;

var client = new Client({
    'apiKey': 'yourAPIKEY',
    'apiSecret': 'yourAPISecret'
});

Addresses();

function Users() {
    client.getUser('userID', function (err, user) {
        console.log(user);
    });

    client.getCurrentUser(function (err, user) {
        console.log(user);
    });

    client.getCurrentUser(function (err, user) {
        user.showAuth(function (err, auth) {
            console.log(auth);
        });
    });

    client.getCurrentUser(function (err, user) {
        user.update({ 'name': 'James Smith' }, function (err, usr) {
            console.log(usr);
        });
    });
}

//Coinbase call Account, a Wallet. (Seek for limits)
function Wallets() {
    client.getAccounts({}, function (err, accounts) {
        console.log(accounts);
    });

    client.getAccount("e7fa9be9-432a-53c0-9994-5a85dcc8ca41", function (err, account) {
        console.log(account);
    });

    client.createAccount({ name: 'New Wallet Test 4' }, function (err, account) {
        console.log(account);
        //console.log(account.client);
        console.log(account.id);
    });

    //Turn default
    client.getAccount('walletID', function (err, account) {
        account.setPrimary(function (err, acct) {
            console.log(acct);
        });
    });
    //Update by ID of the Wallet
    client.getAccount('walletID', function (err, account) {
        account.update({ 'name': 'New account name' }, function (err, acct) {
            console.log(acct);
        });
    });
    //Delete by ID of the Wallet. IF it allow us to create lots of Wallets, never use it. If not, think about a way to delete it after exchanging.
    client.getAccount("e7fa9be9-432a-53c0-9994-5a85dcc8ca41", function (err, account) {
        account.delete(function (err, resp) {
            //if (err == null) {
                console.log(resp);
            //} else {
                console.log(err);
            //}
        });
    });
}

function Addresses() {
    client.getAccount('walletID', function (err, account) {
        account.getAddresses(function (err, addresses) {
            console.log(addresses);
        });
    });

    client.getAccount('walletID', function (err, account) {
        account.getAddress('addressID', function (err, address) {
            console.log(address);
        });
    });

    client.getAccount('walletID', function (err, account) {
        account.getAddress('addressID', function (err, address) {
            console.log(address);
            address.getTransactions({}, function (err, txs) {
                console.log(txs);
            });
        });
    });

    client.getAccount('walletID', function (err, account) {
        account.createAddress(null, function (err, address) {
            console.log(address.address);
            console.log(err);
        });
    });
}

function Transactions() {
    client.getAccount('accountID', function (err, account) {
        account.getTransactions(function (err, txs) {
            console.log(txs);
        });
    });


    client.getAccount('accountID', function (err, account) {
        account.getTransaction('transactionID', function (err, tx) {
            console.log(tx);
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.sendMoney({
            'to': 'yourbtcAddress',
            'amount': '0.1',
            'currency': 'BTC',
            'idem': 'idemID'
        }, function (err, tx) {
            console.log(tx);
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.requestMoney({
            'to': 'email@example.com',
            'amount': '1',
            'currency': 'BTC'
        }, function (err, tx) {
            console.log(tx);
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.getTransaction('transactionID', function (err, tx) {
            tx.complete(function (err, resp) {
                console.log(resp);
            });
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.getTransaction('transactionID', function (err, tx) {
            tx.resend(function (err, resp) {
                console.log(resp);
            });
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.getTransaction('transactionID', function (err, tx) {
            tx.cancel(function (err, resp) {
                console.log(resp);
            });
        });
    });
}

function BuyTransactions() {
    client.getAccount('accountID', function (err, account) {
        account.getBuys(function (err, txs) {
            console.log(txs);
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.getBuy('buyID', function (err, tx) {
            console.log(tx);
        });
    });

    //If you're buying and prices change, it will fail.
    client.getAccount('accountID', function (err, account) {
        account.buy({
            "amount": "10",
            "currency": "BTC",
            "payment_method": "paymentMethodID"
        }, function (err, tx) {
            console.log(tx);
        });
    });
    client.getAccount('accountID', function (err, account) {
        account.getBuy('buyID', function (err, tx) {
            tx.commit(function (err, resp) {
                console.log(resp);
            });
        });
    });
}

function SellTransactions() {
    client.getAccount('accountID', function (err, account) {
        account.getSells(function (err, txs) {
            console.log(txs);
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.getSell('sellID', function (err, tx) {
            console.log(tx);
        });
    });

    //If prices change, the sell will fail."The exchange rate updated while you were waiting. The new total is shown below”.
    client.getAccount('accountID', function (err, account) {
        account.sell({
            "amount": "10",
            "currency": "BTC",
            "payment_method": "paymentMethodID"
        }, function (err, tx) {
            console.log(tx);
        });
    });
    //Solve problem
    client.getAccount('accountID', function (err, account) {
        account.getSell('sellID', function (err, tx) {
            tx.commit(function (err, resp) {
                console.log(resp);
            });
        });
    });
}

function DepositsTransactions() {
    client.getAccount('accountID', function (err, account) {
        account.getDeposits(function (err, txs) {
            console.log(txs);
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.getDeposit('depID', function (err, tx) {
            console.log(tx);
        });
    });

    //Same problem. If prices change.
    client.getAccount('accountID', function (err, account) {
        account.deposit({
            "amount": "10",
            "currency": "USD",
            "payment_method": "paymentMethodID"
        }, function (err, tx) {
            console.log(tx);
        });
    });
    //Solves
    client.getAccount('accountID', function (err, account) {
        account.getDeposit('depID', function (err, tx) {
            tx.commit(function (err, resp) {
                console.log(resp);
            });
        });
    });

}

function Withdraws() {

    client.getAccount('accountID', function (err, account) {
        account.getWithdrawals(function (err, txs) {
            console.log(txs);
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.getWithdrawal('wID', function (err, tx) {
            console.log(tx);
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.withdraw({
            "amount": "10",
            "currency": "USD",
            "payment_method": "paymentMethodID"
        }, function (err, tx) {
            console.log(tx);
        });
    });

    client.getAccount('accountID', function (err, account) {
        account.getWithdrawal('wID', function (err, tx) {
            tx.commit(function (err, resp) {
                console.log(resp);
            });
        });
    });
}

function Payments() {
    client.getPaymentMethods(function (err, pms) {
        console.log(pms);
    });

    client.getPaymentMethod('paymentMethodID', function (err, pm) {
        console.log(pm);
    });
}