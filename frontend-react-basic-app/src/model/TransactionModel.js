import CredentialDB from "../Storage/CredentialsDB";

class TransactionModel{
    constructor(type,hash,transactionDaoType,zoneFrom,zoneTo,timestamp,from,to,amount,amountWithTransactionFee,nonce,v,r,s,pub,xaxis,yaxis) {
        this.Type=type;
        this.Hash=hash;
        this.TransactionDaoType=transactionDaoType;
        this.ZoneFrom=zoneFrom;
        this.ZoneTo=zoneTo;
        this.Timestamp=timestamp;
        this.From=from;
        this.To=to;
        this.Amount=amount;
        this.AmountWithTransactionFee = amountWithTransactionFee;
        this.Nonce=nonce;
        this.V=v;
        this.R=r;
        this.S=s;
        this.Pub=pub;
        this.Xaxis=xaxis;
        this.Yaxis=yaxis;
    }
    get Hash() {
        return this.hash;
    }

    set Hash(value) {
        this.hash = value;
    }

    get TransactionDaoType() {
        return this.transactionDaoType;
    }

    set TransactionDaoType(value) {
        this.transactionDaoType = value;
    }

    get ZoneFrom() {
        return this.zoneFrom;
    }

    set ZoneFrom(value) {
        this.zoneFrom = value;
    }

    get ZoneTo() {
        return this.zoneTo;
    }

    set ZoneTo(value) {
        this.zoneTo = value;
    }

    get Timestamp() {
        return this.timestamp;
    }

    set Timestamp(value) {
        this.timestamp = value;
    }

    get From() {
        return this.from;
    }

    set From(value) {
        this.from = value;
    }

    get To() {
        return this.to;
    }

    set To(value) {
        this.to = value;
    }

    get Amount() {
        return this.amount;
    }

    set Amount(value) {
        this.amount = value;
    }

    get AmountWithTransactionFee() {
        return this.amountWithTransactionFee;
    }

    set AmountWithTransactionFee(value) {
        this.amountWithTransactionFee = value;
    }

    get Nonce() {
        return this.nonce;
    }

    set Nonce(value) {
        this.nonce = value;
    }

    get Xaxis() {
        return this.xaxis;
    }

    set Xaxis(value) {
        this.xaxis = value;
    }

    get Yaxis() {
        return this.yaxis;
    }

    set Yaxis(value) {
        this.yaxis = value;
    }

    get V() {
        return this.v;
    }

    set V(value) {
        this.v = value;
    }

    get R() {
        return this.r;
    }

    set R(value) {
        this.r = value;
    }

    get S() {
        return this.s;
    }

    set S(value) {
        this.s = value;
    }

    get Pub() {
        return this.pub;
    }

    set Pub(value) {
        this.pub = value;
    }


    get Type() {
        return this.type;
    }

    set Type(value) {
        this.type = value;
    }
}
export default TransactionModel;