import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const layer = (searchParams.get('layer') ?? 'structure').toLowerCase();

  const contract = {
    ok: true,
    layer,
    source: 'MASTER_PACKAGE/03_GEO.md',
    version: '2026-09-09',
    model: {
      geographic_hierarchy: ['argentina', 'provincia', 'departamento_partido', 'zona_aproximada'],
      public_units: {
        argentina: {
          type: 'country',
          verified_source: 'IGN_DIVISION_POLITICA + INDEC_CODGEO',
          policy: 'no climate classification or regionalization inferred here'
        },
        provincia: {
          type: 'administrative_province',
          verified_count: 24,
          source: 'IGN + INDEC',
          policy: 'use as government-recognized reference unit'
        },
        departamento_partido: {
          type: 'department_or_partido',
          verified_source: 'INDEC_CODGEO',
          policy: 'use as internal data unit; does not define zone labels'
        },
        zona_aproximada: {
          type: 'editorial_zone_group',
          verified_source: 'project editorial grouping only',
          policy: 'names and membership are editorial, not climate-scientific classification'
        }
      },
      climate_boundary: {
        status: 'PARTIAL_RESEARCH',
        allowed: 'climate source can be attached later without changing the unit structure',
        not_allowed: 'no inferred climate taxonomy or regionalization in this contract'
      },
      routes: {
        provinces: '/api/geo?layer=provinces',
        departments: '/api/geo?layer=departments',
        zones: '/api/geo?layer=zones'
      }
    },
    data: {
      provinces: {
        count: 24,
        key: 'province_id',
        source: 'IGN + INDEC',
        note: 'The project can use a province list with verified government boundaries.'
      },
      departments: {
        count: 'department/partido records are stored as administrative geometry data',
        key: 'department_id',
        source: 'INDEC_CODGEO + IGN',
        note: 'No climate labels are added here.'
      },
      zones: {
        count: 0,
        key: 'zone_id',
        source: 'editorial grouping only',
        note: 'Zone labels are project-defined and must remain independent from the codified climate layer.'
      }
    }
  };

  if (layer === 'provinces') {
    return NextResponse.json({
      ok: true,
      layer,
      structure: 'argentina -> provincia',
      source: 'IGN + INDEC',
      provinces: {
        count: 24,
        fields: ['province_id', 'name', 'slug', 'region_macro', 'geometry_ref'],
        note: 'This list is administrative and may be used for navigation without climate evidence binding.'
      }
    });
  }

  if (layer === 'departments') {
    return NextResponse.json({
      ok: true,
      layer,
      structure: 'argentina -> provincia -> departamento/partido',
      source: 'INDEC_CODGEO + IGN',
      departments: {
        fields: ['department_id', 'province_id', 'name', 'slug', 'geometry_ref'],
        note: 'This unit is verified as the administrative unit that supports a nested zone editorial layer.'
      }
    });
  }

  if (layer === 'zones') {
    return NextResponse.json({
      ok: true,
      layer,
      structure: 'argentina -> provincia -> departamento/partido -> zona_aproximada',
      source: 'project editorial grouping',
      zones: {
        fields: ['zone_id', 'province_id', 'department_id', 'name', 'slug', 'description'],
        note: 'This layer is editorial and must not claim climate classification or regionalization without a verified source.'
      }
    });
  }

  return NextResponse.json(contract);
}
