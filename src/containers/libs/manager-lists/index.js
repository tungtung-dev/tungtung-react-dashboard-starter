import {Component} from 'react';
import Equal from 'deep-equal';
import {autobind} from 'core-decorators';
import QueryManager from 'utils/location_queries';

export default class ManagerLists extends Component {
    defaultManagerConfig = {
        routePath: '/data',
        queryLevel: {
            page: []
        },
        defaultQueryObject: {
            page: 1,
            itemPerPage: 10
        },
        actionGetData: 'getData',
    }

    defaultState = {
        itemsChecked: [],
        isCreate: false,
        isEdit: false,
        isUpdating: false,
        currentItem: {},
    }

    getStateConfig(){
        return {}
    }

    getManagerConfig(){
        return {}
    }

    constructor(props){
        super(props);

        this.managerConfig = {
            ...this.defaultManagerConfig,
            ...this.getManagerConfig()
        };
        this.queryManager = new QueryManager(this.managerConfig.queryLevel);

        this.state = {
            ...this.defaultState,
            ...this.getStateConfig()
        }
        this.superConstructor();
    }

    superConstructor(){}
    superDidMount(){}
    superDidUpdate(){}
    superGetData(){}

    /**
     * Dispatch action get data to store
     */
    getData(resetChecked = false){
        const query = this.queryManager.getQueryObject(this.managerConfig.defaultQueryObject);
        console.log(this.managerConfig.actionGetData);
        this.props[this.managerConfig.actionGetData](query);
        this.superGetData(query);
        if(resetChecked) this._resetItemChecked();
    }

    /**
     * Get data first didmount
     */
    componentDidMount() {
        this.getData();
        this.superDidMount();
    }

    /**
     * Compare different query parameter to reload data
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState){
        if (!Equal(prevProps.location.query, this.props.location.query)) {
            this.getData();
        }
        this.superDidUpdate(prevProps, prevState)
    }

    /**
     * Change location with query level parameters
     * @param queryKey
     * @param queryValue
     */
    updateLocationPage(queryKey, queryValue) {
        const queriesString = this.queryManager.updateQuery(queryKey, queryValue);
        this.props.push(`${this.managerConfig.routePath}?${queriesString}`);
    }

    @autobind
    _handleChangePage(page) {
        this.updateLocationPage('page', page);
    }

    @autobind
    _handleItemsChecked(itemsChecked){
        this.setState({itemsChecked});
    }

    @autobind
    _resetItemChecked(){
        this.setState({itemsChecked: []});
    }

    toggleUpdating(isUpdating) {
        this.setState({isUpdating: (isUpdating !== null && isUpdating !== undefined) ? isUpdating : !this.state.isUpdating});
    }

    @autobind
    toggleCreate() {
        this.setState({isCreate: true, isEdit: false, currentItem: {}});
    }

    @autobind
    toggleEdit(currentItem = {}) {
        this.setState({isEdit: true, isCreate: false, currentItem});
    }
}


ManagerLists.propTypes = {}
