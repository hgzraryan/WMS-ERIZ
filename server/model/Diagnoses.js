const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    patient_id: {
        type: String,
        required: true
    },
    set_id: {
        type: String,
        required: true
    },
	value_type: {
        type: String,
        required: true
    },
	observation_identifier: [String],
	observation_sub_id: {
		type: String
	},
	observation_value: [String],	
	units: {
		type: String
	},
	
	




""
references_range
""
interpretation_codes
""
probability
""
nature_of_abnormal_test
""
observation_result_status
"F"
effective_date_of_reference_range
""
user_defined_access_checks
""
date_Time_of_the_observation
"20120701"
producers_id
""
responsible_observer
""

observation_method
Array (3)
equipment_instance_identifier
null
date_Time_of_the_analysis
null
observation_site
null
observation_instance_identifier
null
mood_code
null
performing_organization_name
null
performing_organization_address
null
performing_organization_medical_director
null
patient_results_release_ategory
null
root_cause
null
local_process_control
null
	
});

module.exports = mongoose.model('Diagnoses', userSchema);
