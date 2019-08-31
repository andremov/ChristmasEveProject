import React, {Component} from 'react';

export class ChristmasDay extends Component {

    state = {
        diff: 0
    };

    componentDidMount() {
        let current = new Date(2019, 11, 26);
        let nextChristmas =new Date (current.getFullYear(),11,25);
        let diff = this.daysBetween(current, nextChristmas);
        if (diff < 0) {
            nextChristmas =new Date (current.getFullYear()+1,11,25);
            diff = this.daysBetween(current, nextChristmas);
        }
        this.setState(  {
          diff
        });
    }

    daysBetween = function( dt1, dt2 ) {
        let one_day=1000*60*60*24;

        let nd2 = Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
        let nd1 = Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate());

        let difference = nd2 - nd1;

        return Math.ceil(difference/one_day);
    }

    render() {
        const diff = this.state.diff;
        return(
            <div>
                {diff === 0 ? 'Christmas Day!' : diff + ' days left'}
            </div>
        );
    }
}