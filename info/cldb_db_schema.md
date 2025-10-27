Project Community_Lens_Database {
  database_type: 'PostgreSQL'
}

enum cldb.months {
  January 
  February
  March
  April
  May
  June
  July
  August
  September
  October
  November
  December
}

// Table cldb_base.AppUser [headercolor: #79AD51] {
//   user_id uuid [pk]
//   person_id uuid [ref: > cldb_base.people.person_id]
//   role_id uuid [ref: > cldb_choice.role.role_id]
//   first_name varchar(100)
//   last_name varchar(100)
//   email varchar(255)
//   password varchar(100)
//   is_admin bool
//   is_active bool
//   last_login timestamp
//   last_updated timestamp
//   date_joined timestamp
// }

Table cldb_choice.role [note: 'This table holds the categories users can be part of. The initial choices are Nebraska Children Staff, Nebraska Children Board Member, Community Member, Consultant, Government Official, Lived Experience Partner, and Reporter. This has been set as a table so that future updates can be made.'] {
  role_id uuid [pk]
  role_name varchar(100) [not null]
}

Table cldb_choice.functions [note: 'Functions are determined by an individual\'s role. See the May 11 document for a list of functions by role.'] {
  function_id uuid [pk]
  function_name varchar(100)
  assoc_role uuid [ref: > cldb_choice.role.role_id]
}

Table cldb_choice.content_area {
  content_area_id uuid [pk]
  content_area_name varchar(100) [not null]
}

Table cldb_choice.function_content_area [note: 'This table constrains the content areas to specific functions. '] {
  function_content_area_id uuid [pk]
  function_id uuid [ref: > cldb_choice.functions.function_id, not null]
  content_area_id uuid [ref: > cldb_choice.content_area.content_area_id, not null]
}


Table cldb_choice.language {
  language_id uuid [pk]
  language_name varchar(100) [not null]
}

Table cldb_choice.language_fluency {
  fluency_id uuid [pk]
  fluency_level varchar(100)
  fluency_description varchar(255) // brief description of what each level means
}

Table cldb_choice.service_types {
  service_type_id uuid [pk]
  service_type_name varchar(100) [not null]
}

Table cldb_geo.states {
  state_id uuid [pk]
  state_name varchar(100)
  state_abbreviation varchar(2)
  state_fips int [unique]
  state_polygon geometry(Polygon, 4326) [note: 'CHECK (ST_IsValid(state_polygon)) CHECK (ST_SRID(state_polygon) = 4326)']
}

Table cldb_geo.ne_counties {
  ne_county_id uuid [pk]
  ne_county_name varchar(100)
  ne_county_fips int [unique]
  ne_county_polygon geometry(Polygon, 4326) 
  associated_state uuid [ref: > cldb_geo.states.state_id]
}

Table cldb_geo.school_districts {
  school_district_id uuid [pk]
  // Finish this!
}

Table cldb_geo.legislative_districts {
  leg_district_id uuid [pk]
  district_number int [unique]
  senator varchar(255)
  district_population int // Get via API
  district_polygon geometry(Polygon, 4326)
}

Table cldb_geo.municipal_boundaries {
  municipal_id uuid [pk]
  place_fp int
  place_ns int
  geo_id int
  municipal_name varchar(100)
  shape_length float
  shape_area float
  city_polygon geometry(Polygon, 4326)
  associated_county uuid [ref: > cldb_geo.ne_counties.ne_county_id]
}

Table cldb_base.people {
  person_id uuid [pk]
  directus_user_id uuid [unique]
  person_role uuid [ref: > cldb_choice.role.role_id]
  first_name varchar(100)
  middle_name varchar(100)
  last_name varchar(100)
  name_suffix varchar(25)
  name_preferred varchar(100) [note:'For names such as Robert to Bob']
  name_prefix_title varchar(100) [note:'For prefix or title such as Mrs Mr Dr Gov Sgt']
  pronouns varchar(100) [note: 'Reference the cldb_choice.pronouns']
  direct_email varchar(255) [unique, not null]
  direct_phone varchar(15)
  cell_phone varchar(15)
  person_address uuid [ref: > cldb_normalized.addresses.address_id]
  employer uuid [ref: < cldb_base.organization.org_id]
  language_spoken varchar(50) [note:'This is driven from the cldb_choice.language']
  person_active boolean
  createdby varchar(255) [note:'Driven by the user who created the record.']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]

  indexes {
    (first_name, last_name) [name: 'idx_full_name'] 
    direct_email [type: btree]
    direct_phone [type: btree]
    employer [type: btree]
    person_active [type: btree]
  }
}

Table cldb_ext.people_language {
  person_id uuid [ref: > cldb_base.people.person_id]
  language_id uuid [ref: > cldb_choice.language.language_id]
  fluency_level uuid [ref: > cldb_choice.language_fluency.fluency_id]

  indexes {
    (person_id, language_id) [pk]
  }
}

Table cldb_ext.work {
  work_id uuid [pk]
  person_id uuid [ref: > cldb_base.people.person_id, note: 'Creates the foreign key for efficient JOINs']
  work_role varchar [note: 'SELECT from cldb_choice.role']
  work_role_description varchar(1024)
  work_geo_area varchar
  work_function varchar [note: 'CONDITIONAL SELECT based on work_role selection']
  function_content_area varchar [note: 'CONDITIONAL SELECT based on work_function']
  content_area_cyi varchar [note: 'CONDITIONAL SELECT based on function_content_area']

  indexes {
    person_id [type: btree]
    work_role [type: btree]
    work_geo_area [type: btree]
    function_content_area [type: btree]
  }
}

Table cldb_ext.email_list {
  email_list_id uuid [pk]
  list_name varchar(255) [not null]
  description text
}

Table cldb_relationship.key_contacts {
  key_contact_id uuid [pk]
  person_id uuid [ref: > cldb_base.people.person_id, not null, note: 'The person who needs a key contact']
  staff_person_id uuid [ref: > cldb_base.people.person_id, not null, note: 'The staff member who is a key contact'] 
  created_date timestamp [default: `now()`]
  createdby varchar(255)
  indexes {
    (person_id, staff_person_id) [unique, name: 'idx_person_staff_unique']
  }
}

Table cldb_relationship.person_function_content_area [note: 'This three-way linking table allows us to track an individual\'s function, and content area. This table will not enforce valid function/content area pairs, so this will have to be handled in the frontend logic.'] {
  pfca_id    uuid [pk]
  person_id  uuid [ref: > cldb_base.people.person_id]
  function_id uuid [ref: > cldb_choice.functions.function_id]
  content_area_id uuid [ref: > cldb_choice.content_area.content_area_id]
}

Table cldb_base.organization {
  org_id uuid [pk, not null]
  person_id uuid [not null, ref: > cldb_base.people.person_id, note: 'Creates the foreign key for efficient JOINs']
  org_name varchar(255) [not null]
  org_description varchar(2000) [note: 'The purpose of this field']
  org_physical_address uuid [ref: > cldb_normalized.addresses.address_id]
  org_mailing_address uuid [ref: > cldb_normalized.addresses.address_id]
  org_public_phone varchar(15)
  org_public_email varchar(255)
  org_website varchar(255)
  is_community_collab boolean [note: 'This should cause additional information to be visible in the UI']
  collab_funding uuid [ref: < cldb_cic.funding_sources.funding_stream_id]
  org_active boolean
  provides_service boolean [note: 'This would cause additional UI features for service information']
  services_provided varchar(255) [ref: > cldb_normalized.services.service_id, note: 'Creates a FK on the org table']
  createdby varchar [note: 'Get the currentUser from ToolJet for this field. This will display an edit button on the UI so that the person who created this record can edit it in the future.']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]

  indexes {
    person_id [name: 'idx_organization_person_id']
    createdby [name: 'idx_organization_createdby']
    org_active [name: 'idx_organization_is_active']
  }
}

Table cldb_normalized.addresses {
  address_id uuid [pk]
  street_1 varchar(255)
  street_2 varchar(255)
  city varchar(100)
  state varchar(2)
  postal_code varchar(10)
  country varchar(50)

  indexes {
    (city, state) [type: btree]
    postal_code [type: btree]
  }
}

Table cldb_normalized.services {
  service_id uuid [pk]
  service_name varchar(100)
  service_description varchar(255)
  eligibility_criteria varchar(255)
  service_category varchar(100) [note: 'This will be driven by a Choice table']
}

Table cldb_cic.funding_sources {
  funding_stream_id uuid [pk]
  funding_stream_name varchar(255)
  funding_type varchar [note: 'Federal State Private'] 
  funding_billing_code varchar(100) [note: 'Comes from the 2023 Excel CWB Contract Tracker']
  award_amount int
  award_description varchar(255)
  award_use_restrictions varchar(255)
  award_date date
  award_expendby date
  award_close_out date
  award_amount_spent int
  award_amount_spent_updated date
  funding_source_edit_ability varchar(255) [ref: > cldb_base.people.person_id]
  createdby varchar [note: 'Get the currentUser from ToolJet for this field. This will display an edit button on the UI so that the person who created this record can edit it in the future.']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]

  indexes {
    funding_stream_name [name: 'idx_funding_stream_name']
    funding_billing_code [name: 'idx_funding_billing_code']
    award_expendby [name: 'idx_award_expendby']
    award_close_out [name: 'idx_award_close_out']
  }
}

Table cldb_cic.community_contract {
  contract_id uuid [pk]
  contract_statedate timestamp
  contract_enddate timestamp
  webgrants_id varchar
  contracted_community uuid [ref: < cldb_base.organization.org_id]
  createdby varchar [note: 'Get the currentUser from ToolJet for this field. This will display an edit button on the UI so that the person who created this record can edit it in the future.']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]
}

Table cldb_cic.community_contract_streams {
  award_stream_id uuid [pk]
  award_billing_code varchar
  award_budgeted_amount int
  funding_source uuid [ref: - cldb_cic.funding_sources.funding_stream_id]
  related_community_contract uuid [ref: < cldb_cic.community_contract.contract_id]
  createdby varchar [note: 'Get the currentUser from ToolJet for this field. This will display an edit button on the UI so that the person who created this record can edit it in the future.']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]
}

Table cldb_cic.expense_report {
  expense_report_id uuid [pk]
  report_month enum.months
  report_year int(4)
  reporting_org uuid [ref: - cldb_base.organization.org_id]
  expense_streams uuid [ref: > cldb_cic.expense_report_streams.report_stream_id]
  createdby varchar [note: 'Get the currentUser from ToolJet for this field. This will display an edit button on the UI so that the person who created this record can edit it in the future.']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]
}

Table cldb_cic.expense_report_streams {
  report_stream_id uuid [pk]
  funding_source uuid [ref: - cldb_cic.funding_sources.funding_stream_id]
  amount_spent int
  createdby varchar [note: 'Get the currentUser from ToolJet for this field. This will display an edit button on the UI so that the person who created this record can edit it in the future.']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]
}

Table cldb_base.cwb_program {
  program_id uuid [ref: > cldb_base.organization.org_id]
  program_name varchar(255)
  program_description varchar(2000)
  program_public_phone varchar(15)
  program_public_email varchar(255)
  program_mailing_address uuid [ref: > cldb_normalized.addresses.address_id]
  program_eligibility_criteria varchar(255)
  program_funding_stream uuid [ref: < cldb_cic.funding_sources.funding_stream_id]
  program_funds_ytd_spend int
  program_funds_allocated int
  program_area_locations uuid [ref: < cldb_base.program_site.program_site_id]
  program_active boolean
  createdby varchar [note: 'Get the currentUser from ToolJet for this field. This will display an edit button on the UI so that the person who created this record can edit it in the future.']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]
}

Table cldb_base.program_site {
  program_site_id uuid [pk]
  associated_program uuid [ref: > cldb_base.cwb_program.program_id]
  program_site_name varchar(255)
  program_mailing_address uuid [ref: > cldb_normalized.addresses.address_id]
  program_physical_address uuid [ref: > cldb_normalized.addresses.address_id]
  program_area_type varchar(100) [note: 'SELECT from area types, e.g., School District, BHD, County, Collaborative, etc']
  enable_reporting boolean [note: 'When enable reporting is set to true, ']
  createdby varchar [note: 'Get the currentUser from ToolJet for this field. This will display an edit button on the UI so that the person who created this record can edit it in the future.']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]
}

Table cldb_ext.licensure_info {
  license_id uuid [pk, not null]
  org_id uuid [ref: > cldb_base.organization.org_id, note: 'Links to an organization if the license applies to the org as a whole']
  program_site_id uuid [ref: > cldb_base.program_site.program_site_id, note: 'Links to a site if the license is site-specific']
  license_number varchar(50) [unique, not null]
  license_type varchar(100) [note: 'Get this from the Term Store on the frontend']
  license_status varchar(50) [note: 'Not mandatory, can be used to indicate things like Active, Provisional, Pending, etc.']
  license_start_date date
  license_expiration date
  issuing_agency varchar(255) [note: 'Get this from the Term Store']
  createdby varchar(255) [note: 'Get this from the logged in user']
  created_date timestamp [default: `now()`]
  modifiedby varchar(255) [note: 'Get this from the logged in user']
  modified_date timestamp [default: `now()`]
  
  indexes {
    org_id [name: 'idx_licensure_org_id']
    program_site_id [name: 'idx_licensure_site_id']
  }
}


Table cldb_info.community_workgroups {
  community_workgroup_id uuid [pk]
  workgroup_name varchar(100)
  workgroup_lead_person uuid [ref: > cldb_base.people.person_id]
  workgroup_lead_org uuid [ref: > cldb_base.organization.org_id]
  meeting_cadence varchar(25) [note: 'Weekly, Monthly, Quarterly, Other']
  meeting_cadence_info varchar(255) [note: 'Describe when the meeting meets, e.g., Second Tuesday of the Month']
  meeting_description varchar(500) [note: 'Any information that would be helpful to know about the workgroup']
  createdby varchar(255)
  created_date timestamp [default: `now()`]
  modifiedby varchar(255)
  modified_date timestamp [default: `now()`]
}

Table cldb_data.data_collection [note: 'This table lists all of the data collection that is happening in CLDB. This table is used to link dropdown values to their respective reports. Note, the report must be entered manually in this table unless Postgres Triggers are put in place'] {
  report_id uuid [pk]
  report_name varchar(80)
  is_active bool [default: true]
  data_collection_begin date [default: `now()`, note: 'This field indicates when the data collection using this form began']
  data_collection_end date [note: 'If data collection is no longer happening, this field will indicate when the data collection stopped. Additionally, is_active should be set to false.']
}

Table cldb_data.term_sets [note: 'Stores groups of related terms used for dropdowns. Each term set represents a single category of dropdown options.'] {
  term_set_id uuid [pk]
  term_set_name varchar(100) [unique, note: 'The name of the term set, e.g., "Step Up to Quality Scores", "License Types", etc.']
  description text [note: 'Optional description of what this term set is used for']
}

Table cldb_data.terms [note: 'Stores individual terms within a term set. These terms represent dropdown options.'] {
  term_id uuid [pk]
  term_set_id uuid [ref: > cldb_data.term_sets.term_set_id, note: 'Links the term to its term set']
  term_value varchar(250) [note: 'The specific value for this dropdown option']
  display_order int [default: 0, note: 'Defines the order in which terms should appear in dropdowns']
}

Table cldb_data.report_term_sets [note: 'Links term sets to specific reports. If a term set is global, it will not require an entry in this table.'] {
  report_term_set_id uuid [pk]
  term_set_id uuid [ref: > cldb_data.term_sets.term_set_id]
  report_id uuid [ref: > cldb_data.data_collection.report_id]
}


Table cldb_data.program_site_dropdown [note: 'The purpose of this table is to hold the values that are used to populate the Location field on any `data` tables'] {
  site_report_option_id uuid [pk]
  associated_program uuid [ref: > cldb_base.cwb_program.program_id]
  associated_site uuid [ref: > cldb_base.program_site.program_site_id]
  associated_report uuid [ref: > cldb_data.data_collection.report_id]
}

Table cldb_data.sixpence_report [note: 'This table stores information for the reports required of Sixpence'] {
  sixpence_report_id uuid [pk]
  report_date date
  assoc_school_district uuid [ref: > cldb_geo.school_districts.school_district_id]
  program_location uuid [ref: > cldb_base.program_site.program_site_id]
  ccp_coordinator_name varchar(100) [ref: > cldb_base.people.person_id, note: 'In the UI provide a way to create this person from the report']
  ccp_coach_name varchar(100) [ref: > cldb_base.people.person_id, note: 'In the UI provide a way to create this person from the report']
  
}

Table cldb_junction.person_workgroup_participant {
  person_id uuid [ref: > cldb_base.people.person_id]
  community_workgroup_id uuid [ref: > cldb_info.community_workgroups.community_workgroup_id]

  indexes {
    (person_id, community_workgroup_id) [pk]
  }
}

Table cldb_junction.person_program {
  person_id uuid [ref: > cldb_base.people.person_id]
  program_id uuid [ref: > cldb_base.cwb_program.program_id]

  indexes {
    (person_id, program_id) [pk]
  }
}

Table cldb_junction.people_email_list {
  person_id uuid [ref: > cldb_base.people.person_id]
  email_list_id uuid [ref: > cldb_ext.email_list.email_list_id]
  created_date timestamp [default: `now()`]

  indexes {
    (person_id, email_list_id) [pk]
  }
}

Table cldb_junction.person_program_site {
  person_id uuid [ref: > cldb_base.people.person_id]
  program_site_id uuid [ref: > cldb_base.program_site.program_site_id]

  indexes {
    (person_id, program_site_id) [pk]
  }
}
