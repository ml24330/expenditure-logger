import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLFloat, 
    GraphQLInt,
    GraphQLNonNull,
    GraphQLEnumType
} from 'graphql';
import { v4 as uuidv4 } from 'uuid';
import _Log from '../models/log.js';
// For debugging
// import _Log from './dummyData.js';

const SAMPLE_ID = "1";

type LogType = {
    userId: string,
    id: string,
    title: string,
    detail: string,
    amount: number,
    currency: number,
    date: string
}

type LogByDateType = {
    date: string,
    HKD_amount: number,
    GBP_amount: number,
    count: number,
    logs: LogType[]
}

const CurrencyEnumType = new GraphQLEnumType({
    name: 'currencies',
    values: {
        HKD: {
            value: 1
        },
        GBP: {
            value: 2
        }
    }
});

const Log = new GraphQLObjectType({
    name: 'Log',
    description: 'Represent the type of a log containing details of a transaction',
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        detail: {type: GraphQLString},
        amount: {type: GraphQLFloat},
        currency: {type: CurrencyEnumType},
        date: {type: GraphQLString}
    })
});

const LogByDate = new GraphQLObjectType({
    name: 'LogByDate',
    description: 'Represent info about logs recorded on a given day',
    fields: () => ({
        date: {type: GraphQLString},
        HKD_amount: {type: GraphQLFloat},
        GBP_amount: {type: GraphQLFloat},
        count: {type: GraphQLInt},
        logs: {type: GraphQLList(Log)}
    })
});

const Query = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root query object',
    fields: {
        logs: {
            type: new GraphQLList(Log),
            args: {
                userId: {type: GraphQLNonNull(GraphQLString)},
                id: {type: GraphQLString},
                minAmount: {type: GraphQLFloat},
                maxAmount: {type: GraphQLFloat},
                minDate: {type: GraphQLString},
                maxDate: {type: GraphQLString},
                currency: {type: CurrencyEnumType},
                title: {type: GraphQLString}
            },
            resolve: async (parent, args) => {
                let logs = await _Log.find({userId: args.userId}) as unknown as LogType[];
                if(args.id){
                    logs = logs.filter(log => log.id === args.id);
                }
                if(args.currency){
                    logs = logs.filter(log => log.currency === args.currency);
                }
                if(args.minAmount){
                    logs = logs.filter(log => log.amount > args.minAmount);
                }
                if(args.maxAmount){
                    logs = logs.filter(log => log.amount < args.maxAmount);
                }
                if(args.minDate){
                    logs = logs.filter(log => log.date > args.minDate);
                }
                if(args.maxDate){
                    logs = logs.filter(log => log.date < args.maxDate);
                }
                if(args.title){
                    logs = logs.filter(log => log.title.includes(args.title));
                }
                return logs;    
            }
        },
        logsByDate: {
            type: new GraphQLList(LogByDate),
            args: {
                userId: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                let logs = await _Log.find({userId: args.userId}) as unknown as LogType[];
                logs = logs.filter(log => new Date().getTime() - new Date(log.date).getTime() < 365*24*60*60*1000); // Only return recent data
                let logsByDateArray: LogByDateType[] = [];
                logs.forEach(log => {
                    let dateObject = logsByDateArray.find(item => item.date === log.date);
                    if(!dateObject){
                        if(log.currency === 1){
                            logsByDateArray.push({date: log.date, GBP_amount: 0, HKD_amount: log.amount, count: 1, logs: [log]});
                        }else if(log.currency === 2){
                            logsByDateArray.push({date: log.date, GBP_amount: log.amount, HKD_amount: 0, count: 1, logs: [log]});
                        }
                    }else{
                        if(log.currency === 1){
                            dateObject.HKD_amount += log.amount;
                        }else if(log.currency === 2){
                            dateObject.GBP_amount += log.amount;
                        }
                        dateObject.count++;
                        dateObject.logs.push(log);
                    }
                });
                logsByDateArray = logsByDateArray.map(item => ({...item, HKD_amount: Math.round(item.HKD_amount), GBP_amount: Math.round(item.GBP_amount)}));
                return logsByDateArray;
            }
        },
        logsByMonth: {
            type: new GraphQLList(LogByDate),
            args: {
                userId: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                let logs = await _Log.find({userId: args.userId}) as unknown as LogType[];
                logs = logs.filter(log => new Date().getTime() - new Date(log.date).getTime() < 2*365*24*60*60*1000); // Only return recent data
                let logsByDateArray: LogByDateType[] = [];
                logs.forEach(log => {
                    let logMonth = log.date.slice(0,-3);
                    let dateObject = logsByDateArray.find(item => item.date === logMonth);
                    if(!dateObject){
                        if(log.currency === 1){
                            logsByDateArray.push({date: logMonth, GBP_amount: 0, HKD_amount: log.amount, count: 1, logs: [log]});
                        }else if(log.currency === 2){
                            logsByDateArray.push({date: logMonth, GBP_amount: log.amount, HKD_amount: 0, count: 1, logs: [log]});
                        }
                    }else{
                        if(log.currency === 1){
                            dateObject.HKD_amount += log.amount;
                        }else if(log.currency === 2){
                            dateObject.GBP_amount += log.amount;
                        }
                        dateObject.count++;
                        dateObject.logs.push(log);
                    }
                });
                logsByDateArray = logsByDateArray.map(item => ({...item, HKD_amount: Math.round(item.HKD_amount), GBP_amount: Math.round(item.GBP_amount)}));
                return logsByDateArray;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'The root mutation object',
    fields: {
        addLog: {
            type: Log,
            args: {
                userId: {type: GraphQLNonNull(GraphQLString)},
                title: {type: GraphQLNonNull(GraphQLString)},
                detail: {type: GraphQLNonNull(GraphQLString)},
                amount: {type: GraphQLNonNull(GraphQLFloat)},
                currency: {type: GraphQLNonNull(CurrencyEnumType)},
                date: {type: GraphQLString}
            },
            resolve: async (parent, args) => {
                if(args.userId === SAMPLE_ID){
                    throw Error('Sample data cannot be modified!')
                }
                if(args.amount.toString().split('.')[1] && args.amount.toString().split('.')[1].length > 2){
                    throw Error('You can have at most two decimal places!');
                }
                if(!args.date){
                    args.date = new Date().toISOString().split('T')[0];
                }
                let log = new _Log({
                    userId: args.userId,
                    id: uuidv4(),
                    title: args.title,
                    detail: args.detail,
                    amount: args.amount,
                    currency: args.currency,
                    date: args.date
                });
                await log.save();
                return log;
            }
        },
        deleteLog: {
            type: Log,
            args: {
                userId: {type: GraphQLNonNull(GraphQLString)},
                id: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                if(args.userId === SAMPLE_ID){
                    throw Error('Sample data cannot be modified!')
                }
                let log = await _Log.findOneAndDelete({userId: args.userId, id: args.id}); 
                if(!log){
                    throw Error('Log not found!');
                }
                return log;
            }
        },
        editLog: {
            type: Log,
            args: {
                userId: {type: GraphQLNonNull(GraphQLString)},
                id: {type: GraphQLNonNull(GraphQLString)},
                title: {type: GraphQLString},
                detail: {type: GraphQLString},
                amount: {type: GraphQLFloat},
                currency: {type: CurrencyEnumType},
                date: {type: GraphQLString}
            },
            resolve: async (parent, args) => {
                if(args.userId === SAMPLE_ID){
                    throw Error('Sample data cannot be modified!')
                }
                let log = await _Log.findOne({userId: args.userId, id: args.id}) as unknown as LogType;
                if(!log){
                    throw Error('Log not found!');
                }
                if(args.amount.toString().split('.')[1] && args.amount.toString().split('.')[1].length > 2){
                    throw Error('You can have at most two decimal places!');
                }
                let newLog = {
                    userId: args.userId,
                    id: args.id,
                    title: args.title || log.title,
                    detail: args.detail || log.detail,
                    amount: args.amount || log.amount,
                    currency: args.currency || log.currency,
                    date: args.date || log.date
                };
                await _Log.updateOne({id: args.id}, newLog);
                return newLog;
            }
        }
    }
})

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;