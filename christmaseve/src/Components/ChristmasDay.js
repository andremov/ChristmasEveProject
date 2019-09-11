import React, {Component} from 'react';

export class ChristmasDay extends Component {

    state = {
        rows : [],
        diff : -1,
        date : 0
    };


    constructor(props, context) {
        super(props, context);

        this.checkDate = this.checkDate.bind(this);
    }

    componentDidMount() {
        setInterval(this.checkDate, 1000);
    }

    checkDate = function() {
        let current = new Date();
        const lastChecked = this.state.date;
        if (lastChecked !== current.getDate()) {
            this.calcDiff();
        }
    };

    calcDiff = function() {
        let current = new Date();
        let nextChristmas =new Date (current.getFullYear(),11,25);
        let diff = this.daysBetween(current, nextChristmas);
        if (diff < 0) {
            nextChristmas =new Date (current.getFullYear()+1,11,25);
            diff = this.daysBetween(current, nextChristmas);
        }
        
        let rows = [];
        if (diff !== 0) {

            let maxRowWords = 12;
            let row = 0;
            let w = diff-1;
            while (w > 0) {
                rows[row] = [];
                rows[row].key = row;
                rows[row].words = [];
                rows[row].size = (6-(0.125*row))+'em';
                let rowWords = Math.min(w,maxRowWords);
                for (let word = 0; word < rowWords; word++) {
                    rows[row].words[word] = [];
                    rows[row].words[word].name = 'Eve';
                    rows[row].words[word].key = word;
                }
                w -= rowWords;
                row ++;
                rowWords += 0;
            }
        }
        this.setState({
            rows,
            diff,
            date : current.getDate()
        })
    };

    daysBetween = function( dt1, dt2 ) {
        let one_day=1000*60*60*24;

        let nd2 = Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
        let nd1 = Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate());

        let difference = nd2 - nd1;

        return Math.ceil(difference/one_day);
    };

    render() {
        let {rows, diff} = this.state;

        return(
            <div>
                <div className='p-5 d-block flex'>
                    <span className='font-size-huge'>Today is...</span>
                    <span className='font-size-large'>{diff === -1 ? 'A Special Day!' : diff === 0 ? 'Christmas Day!' : ' Christmas Eve '}</span>
                    {rows.map(row => {
                        return (
                        <span style={{fontSize: row.size}} key = {row.key}>
                            {row.words.map(word => {
                                return(
                                <span key={word.key}>
                                    {word.name + ' '}
                                </span>
                                )
                            })}
                        </span>
                        )
                    })}
                </div>
                <div style={{visibility: 'hidden', width: '90%', maxWidth: '900px', margin: 'auto', backgroundColor: 'rgba(80,80,150,1)'}}>
                    <div style={{width: (((365-diff) / 365) * 100)+'%', display: 'block', height: 20+'px', backgroundColor: 'rgba(255,255,255,0.25)'}} />
                </div>
            </div>
        );
    }
}